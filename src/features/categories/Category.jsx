import {  Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { deleteDocument, updateDocument } from "../../firebase/firestoreUtils"; // Adjust the path if needed

export default function Category({category}) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const handleRemove = () => {
    deleteDocument('categories', category.id);
  };

  const handleUpdate = async () => {
    if (isEditing) {
      await updateDocument(category.id, { name: categoryName }, 'categories');
    }
    setIsEditing(!isEditing);
  };

  return (
    <Card sx={{ p: 3, m: 2, ml: 0}}>
      {isEditing ? (
        <TextField
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          variant="outlined"
        />
      ) : (
        <>{categoryName}</>
      )}
      <Button onClick={handleUpdate}>
        {isEditing ? "Save" : "Update"}
      </Button>
      <Button onClick={handleRemove}>Remove</Button>
    </Card>
  );
}
