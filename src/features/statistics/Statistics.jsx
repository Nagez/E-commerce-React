import React, { useEffect, useState } from 'react';
import BasicPie from "../../components/BasicPie";
import BasicBars from "../../components/BasicBars";
import { getPurchasesAmount, getPurchasesByUser } from '../../firebase/firestorePurchasesUtils'; 
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { getDocuments } from '../../firebase/firestoreUtils'; 

export default function Statistics() {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState({ products: [], quantities: [] });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const purchases = await getPurchasesAmount(); 
        setPieData(purchases);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    fetchPurchases();
  }, []);

  // Load users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getDocuments('users');
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection
  const handleUserChange = async (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    try {
      const userPurchases = await getPurchasesByUser(userId);
      const productMap = {};

      // Count quantities for each product
      userPurchases.forEach(purchase => {
        const { title, quantity } = purchase;
        if (productMap[title]) {
          productMap[title] += quantity;
        } else {
          productMap[title] = quantity;
        }
      });

      const products = Object.keys(productMap);
      const quantities = Object.values(productMap);
      setBarData({ products, quantities });
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2}}>
        <Typography variant="h5" align="center" gutterBottom>
          Total Sold Products
        </Typography>
        <BasicPie data={pieData} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Products Quantity Per Customer
        </Typography>
        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
          <InputLabel id="user-select-label">Select User</InputLabel>
          <Select
            labelId="user-select-label"
            value={selectedUser}
            onChange={handleUserChange}
            displayEmpty
          >
            <MenuItem value="" disabled></MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.displayName || `${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <BasicBars data={barData} />
      </Box>
    </Box>
  );
}
