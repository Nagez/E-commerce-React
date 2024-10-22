import { useEffect, useState } from "react";
import Product from "./Product";
import { getDocuments, addDocument, updateDocument } from "../../firebase/firestoreUtils"; // Updated import for getDocuments
import { Box, Button } from "@mui/material";

export default function Products() {
  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  //temp example product
  const [newProduct, setNewProduct] = useState({
    title: "new product",
    category: "",
    description: "",
    price: 0,
    linkToPic: "",
  });

  // Fetch both categories and products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and products using the same utility function
        const fetchedCategories = await getDocuments("categories");
        const fetchedProducts = await getDocuments("products");

        setCategoryList(fetchedCategories);
        setProductsList(fetchedProducts);
      } catch (err) {
        console.error("Error fetching data: ", err.message);
      }
    };

    fetchData();
  }, []);

  // Add a new product to Firestore and update local state
  const handleAddProduct = async () => {
    try {
      let addedProduct = await addDocument(newProduct, "products"); // Use the utility function to add a new product
      addedProduct = {...addedProduct, id: addedProduct.id}
      setProductsList([...productsList, addedProduct]); // Update the state with the new product
      console.log("Product added with ID: ", addedProduct.id);
    } catch (err) {
      console.error("Error adding product: ", err.message);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      // Update the product in Firestore
      await updateDocument(updatedProduct.id, updatedProduct, "products");
      // Update the local state
      setProductsList(productsList.map(product => product.id === updatedProduct.id ? updatedProduct : product));
      console.log("Product updated successfully.");
      alert("Product updated successfully.")
    } catch (err) {
      console.error("Error updating product: ", err.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Render the products */}
      {productsList.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title} // Use the correct case
          category={product.category}
          description={product.description}
          price={product.price}
          linkToPic={product.linkToPic}
          categoryList={categoryList}
          onUpdateProduct={handleUpdateProduct}
        />
      ))}

      {/* Button to add a new product */}
      <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ mt: 2 }}>
        Add New Product
      </Button>
    </Box>
  );
}
