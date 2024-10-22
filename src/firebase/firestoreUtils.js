import { collection, deleteDoc, doc, getDocs, updateDoc, addDoc, query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; 

// Remove a document with error handling
export const deleteDocument = async (collection, docId) => {
  try {
    await deleteDoc(doc(db, collection, docId));
    console.log(`Document with ID ${docId} successfully deleted.`);
  } catch (err) {
    console.error(`Error deleting document: ${err.message}`);
    throw err;
  }
};

// Add a new document 
export const addDocument = async (productData, collectionName) => {
  try {
    // Create a reference to the Firestore collection using the collection function
    const collectionRef = collection(db, collectionName);
    
    // Add the new document to the collection
    const docRef = await addDoc(collectionRef, productData);
    
    console.log("Document added with ID: ", docRef.id);
    return { id: docRef.id, ...productData }; // Return the added product with its new ID
  } catch (err) {
    console.error("Error adding document: ", err.message);
    throw err;
  }
};

// Update a document with error handling
export const updateDocument = async (docId, updatedData, collection) => {
  try {
    const collectionRef = doc(db, collection, docId);
    await updateDoc(collectionRef, updatedData);
    console.log(`Document with ID ${docId} successfully updated.`);
  } catch (err) {
    console.error(`Error updating document: ${err.message}`);
    throw err;
  }
};

// Fetch documents from Firestore for a given collection name
export const getDocuments = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error(`Error fetching documents from ${collectionName}:`, err.message);
    throw err;
  }
};

export const getDocByParam = async (collectionName, param, value) => {
  try {
    // Create a query against the collection
    const usersRef = collection(db, collectionName); 
    const q = query(usersRef, where(param, '==', value)); 

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map through the snapshot to get documents
    const userDocs = querySnapshot.docs.map(doc => ({
      id: doc.id, // Include document ID
      ...doc.data(), // Spread the document data
    }));
    if (userDocs.length > 0) {
      return userDocs[0]; //return the first value
    } else {
      console.log('No such doc');
      return null;
    }
  } catch (err) {
    console.error('Error fetching doc:', err.message);
    throw err;
  }
};

export const getDocById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id); // Direct reference to the document by ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // Return the document data with its ID
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (err) {
    console.error('Error fetching document by ID:', err.message);
    throw err;
  }
};