import { Box, Button, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { updateItem, removeFromCart } from '../../redux/cartActions'; 
import DeleteIcon from '@mui/icons-material/Delete';

const CURRENCY = '₪';

export default function Item({ id, name, price, initQuantity }) {
  const [quantity, setQuantity] = useState(initQuantity);
  const dispatch = useDispatch();

  // Function to handle increment
  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + 1;
        dispatch(updateItem({ id, quantity: newQuantity })); // Dispatch update
        return newQuantity;
      });
    }
  };

  // Function to handle decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        dispatch(updateItem({ id, quantity: newQuantity })); 
        return newQuantity;
      });
    }
  };

  // Function to handle delete
  const handleDelete = () => {
    dispatch(removeFromCart(id)); 
  };

  useEffect(() => {
    dispatch(updateItem({ id, quantity }));
  }, [quantity, dispatch, id]);

  return (
    <Box>
      {/* Delete button */}
      <IconButton
        onClick={handleDelete}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          padding: 0,
          bgcolor: '#fff', 
          '&:hover': {
            bgcolor: '#f44336', // Change color on hover
          },
        }}
        size="medium"
      >
        <DeleteIcon fontSize="medium" />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',  // Stack items vertically
          alignItems: 'flex-start',  // Align items to the left
          justifyContent: 'center',
          borderRadius: 8,
          backgroundColor: '#f0f0f0',  // Light gray background
          p: 2,
          width: 'fit-content',  // Makes the box fit around its content
          mt: 2,
          border: '1px solid #ddd',  // Light border
          minWidth: '180px',
          position: 'relative'  // Enable positioning for child elements
        }}
      >

        {/* Name on a separate line */}
        <Typography variant="body1">
          Name: {name}
        </Typography>

        {/* Quantity control and total price */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleDecrement} sx={{ minWidth: '40px' }}>-</Button>
          <Typography variant="body1" sx={{ px: 1 }}>
            {quantity}
          </Typography>
          <Button onClick={handleIncrement} sx={{ minWidth: '40px' }}>+</Button>
          <Typography variant="body1">
            units.
          </Typography>
        </Box>
        <Typography variant="body1">
          Total: {CURRENCY} {quantity * price}
        </Typography>
      </Box>
    </Box>

  );
}
