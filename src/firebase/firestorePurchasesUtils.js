// Import Firestore functions from Firebase
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import { getDocuments } from "./firestoreUtils";

// Utility functions for managing purchases in Firestore

/**
 * Add a new purchase document to Firestore
 * @param {Object} purchaseData - The data for the purchase to add
 * @returns {Object} - The added purchase with its new Firestore ID
 */
export const addPurchase = async (purchaseData) => {
  try {
    const docRef = await addDoc(collection(db, 'purchases'), purchaseData);
    console.log("Purchase added with ID: ", docRef.id);
    return { id: docRef.id, ...purchaseData };
  } catch (err) {
    console.error("Error adding purchase: ", err.message);
    throw err;
  }
};

/**
 * Fetch all purchases made by a specific user
 * @param {String} userId - The ID of the user to fetch purchases for
 * @returns {Array} - List of purchase documents for the user
 */
export const getPurchasesByUser = async (userId) => {
  try {
    const purchasesQuery = query(collection(db, 'purchases'), where('userId', '==', userId));
    const snapshot = await getDocs(purchasesQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching purchases for user:", err.message);
    throw err;
  }
};

export const getPurchasesAmount = async () => {
  try {
    // Fetch all purchases from the Firestore 'purchases' collection
    const purchases = await getDocuments('purchases');

    // Create a map to hold product counts
    const productCountMap = {};

    // Iterate over all purchases to count quantities per product
    purchases.forEach((purchase) => {
      const { productId, title, quantity } = purchase;

      // If the product already exists in the map, increment its quantity
      if (productCountMap[productId]) {
        productCountMap[productId].quantity += quantity;
      } else {
        // Otherwise, initialize it with the current quantity
        productCountMap[productId] = {
          title: title,
          quantity: quantity,
        };
      }
    });

    // Transform the product count map into the format required for the PieChart
    return Object.keys(productCountMap).map((productId) => ({
      id: productId,
      value: productCountMap[productId].quantity,
      label: productCountMap[productId].title,
    }));
  } catch (err) {
    console.error('Error fetching purchases:', err.message);
    throw err;
  }
};


/**
 * Fetch all purchases for a specific product
 * @param {String} productId - The ID of the product to fetch purchases for
 * @returns {Array} - List of purchase documents for the product
 */
export const getPurchasesByProduct = async (productId) => {
  try {
    const productQuery = query(collection(db, 'purchases'), where('productId', '==', productId));
    const snapshot = await getDocs(productQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching purchases for product:", err.message);
    throw err;
  }
};

/**
 * Calculate the total quantity of products bought by a specific user
 * @param {String} userId - The ID of the user to calculate the total for
 * @returns {Number} - Total quantity of products bought by the user
 */
export const getTotalProductsBoughtByUser = async (userId) => {
  try {
    const purchases = await getPurchasesByUser(userId);
    const totalQuantity = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    return totalQuantity;
  } catch (err) {
    console.error("Error calculating total products bought by user:", err.message);
    throw err;
  }
};

/**
 * Calculate the total quantity bought for a specific product across all users
 * @param {String} productId - The ID of the product to calculate the total for
 * @returns {Number} - Total quantity bought for the product
 */
export const getTotalQuantityForProduct = async (productId) => {
  try {
    const purchases = await getPurchasesByProduct(productId);
    const totalQuantity = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    return totalQuantity;
  } catch (err) {
    console.error("Error calculating total quantity for product:", err.message);
    throw err;
  }
};

export const isAllowingSharing = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDocs(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.allowShare;
    } else {
      console.error("No such user found");
      return false; 
    }
  } catch (err) {
    console.error("Error fetching user:", err.message);
    throw err;
  }
}

/**
 * Calculate the total quantity of a product bought where the user allows sharing.
 * @param {String} productId - The ID of the product to calculate the total for
 * @returns {Number} - Total quantity bought for the product where users allow sharing
 */
export const getBoughtProduct = async (productId) => {
  try {
    // Step 1: Fetch all purchases for the given product ID
    const productQuery = query(collection(db, 'purchases'), where('productId', '==', productId));
    const snapshot = await getDocs(productQuery);

    let totalQuantity = 0;

    // Step 2: Iterate over each purchase
    for (const docSnapshot of snapshot.docs) {
      const purchase = docSnapshot.data();

      // Step 3: Fetch the corresponding user document
      const userRef = doc(db, "users", purchase.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Step 4: Check if the user allows sharing
        if (userData.allowShare === true) {
          // Add the quantity to the total only if the user allows sharing
          totalQuantity += purchase.quantity;
        }
      } else {
        console.warn(`User with ID ${purchase.userId} does not exist.`);
      }
    }

    return totalQuantity;

  } catch (err) {
    console.error("Error calculating total quantity for shared product:", err.message);
    throw err;
  }
};
