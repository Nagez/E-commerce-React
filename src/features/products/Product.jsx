import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Card, Select, MenuItem } from '@mui/material';
import BoughtByTable from './BoughtByTable';

export default function Product({ id, title, category, description, price, linkToPic, onUpdateProduct, categoryList }) {
  const [productData, setProductData] = useState({
    id,
    title,
    category,
    description,
    price,
    linkToPic,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    onUpdateProduct(productData); // Send updated product data to parent
  };

  return (
    <Card sx={{ p: 3, width: '60%', m: 1 }}>
      <Grid container spacing={2} className="product">
        {/* Title */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Title:</Box>
          <TextField
            name="title"
            value={productData.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Price:</Box>
          <TextField
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Category:</Box>
          <Select
            name="category"
            value={productData.category}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={productData.category} sx={{ display: 'none' }}>
              {productData.category}
            </MenuItem>
            {categoryList.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Image URL */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Image URL:</Box>
          <TextField
            name="linkToPic"
            value={productData.linkToPic}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Description:</Box>
          <TextField
            name="description"
            value={productData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>

        {/* Bought By Table */}
        <Grid item xs={12} md={6}>
          <Box sx={{ fontWeight: 'bold' }}>Bought By:</Box>
          <BoughtByTable productId={id} /> {/* Pass product ID */}
        </Grid>

        {/* Update Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Product
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
