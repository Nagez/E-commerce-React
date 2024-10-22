import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPurchasesByUser } from '../../firebase/firestorePurchasesUtils';
import UserOrdersTable from './UserOrdersTable';

export default function Orders() {
  const [purchases, setPurchases] = useState([]);

  const loadPurchases = async () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      try {
        const userPurchases = await getPurchasesByUser(userId);
        setPurchases(userPurchases);
      } catch (error) {
        console.error('Error loading purchases: ', error);
      }
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <UserOrdersTable purchases={purchases} /> {/* Use the new OrdersTable component */}
    </Box>
  );
}
