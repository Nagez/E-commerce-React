import React, { useState } from "react";
import useCollection from "../../hooks/useCollection";
import { Box, Button, Card, Input } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Category from "./Category";

export default function Categories() {
    const { data: categories, loading, error } = useCollection("categories");
    const [newCategory, setNewCategory] = useState(""); 

    const handleAddCategory = async () => {
        if (newCategory.trim() === "") return; // Prevent adding empty categories

        try {
            const docRef = await addDoc(collection(db, 'categories'), {
                name: newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase(), //add the name formatted to first letter uppercase
            });
            console.log("Category added with ID: ", docRef.id);
            setNewCategory(""); // Clear the input after adding
        } catch (err) {
            console.error("Error adding category: ", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4}}>
        <Card sx={{ p: 3,width: '60%' }}>
            <Box sx={{ fontWeight: 'bold', fontSize: 'h4.fontSize' }}>Categories</Box>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
            <Box display="flex" gap={2}>
                <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    Add
                </Button>
            </Box>
        </Card>
        </Box>
    );
}
