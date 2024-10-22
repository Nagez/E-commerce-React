import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartActions'; 
import { useEffect, useState } from "react";
import { getBoughtProduct } from "../../firebase/firestorePurchasesUtils";

const CURRENCY = '₪';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [boughtQuantity, setBoughtQuantity] = useState(0); // State to hold the total bought quantity
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch total quantity bought for the product when component mounts
    const fetchBoughtQuantity = async () => {
      try {
        const totalBought = await getBoughtProduct(product.id); // Fetch the total quantity bought for the product
        setBoughtQuantity(totalBought); // Set the state with the fetched total quantity
      } catch (err) {
        console.error('Error fetching total bought quantity:', err.message);
      }
    };

    fetchBoughtQuantity(); // Call the function
  }, [product.id]); // Re-run when the product ID changes


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!product.inStock || product.inStock <= 0) {
      alert('cant add not in stock products to cart')
      return
    }
    if (quantity > 0) {
      const item = { ...product, quantity };
      dispatch(addToCart(item));
    }
  };

  return (
    <Card sx={{ p: 3, width: '500px', m: 1, borderRadius: '16px', boxShadow: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h5" gutterBottom>{product.title}</Typography>
          <Typography variant="body1" gutterBottom>{product.description}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Price: {CURRENCY}{product.price}
          </Typography>
          <Typography variant="body2" color={product.inStock ? "green" : "red"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Typography>

          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button onClick={handleDecrement} sx={{ minWidth: '40px' }}>-</Button>
            <Typography variant="body1" sx={{ px: 2 }}>{quantity}</Typography>
            <Button onClick={handleIncrement} sx={{ minWidth: '40px' }}>+</Button>
          </Box>

          <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>
            Add to Cart
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Box component="img" src={product.linkToPic} alt={product.title} sx={{ width: '100%', borderRadius: 2 }} />
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Bought: {boughtQuantity}
        </Grid>
      </Grid>
    </Card>
  );
}
