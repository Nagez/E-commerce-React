import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Card, Checkbox, FormControlLabel } from '@mui/material';
import { getDocById, updateDocument } from '../firebase/firestoreUtils';


export default function MyAccount() {
  const localStorageId = localStorage.getItem('userId');

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    allowShare: false,
  });

  useEffect(() => {
    const fetchUserById = async () => {
      if (localStorageId) {
        const userDoc = await getDocById('users', localStorageId); // Fetch by document ID

        if (userDoc) {
          setUserData(userDoc); // Set the fetched user data in the state
        } else {
          console.log('No user found with the provided ID.');
        }
      }
    };

    fetchUserById(); // Call the async function
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setUserData({
      ...userData,
      allowShare: e.target.checked, // check-box boolean value
    });
  };

  const handleUpdate = async () => {
    if (!localStorageId) return 'no id found'
    try {
      await updateDocument(localStorageId, userData, 'users'); // Update user data
      alert('Account details successfully updated.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

      <Card sx={{ p: 3, width: '60%', m: 1 }}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12}>
            <Box sx={{ fontWeight: 'bold' }}>First Name:</Box>
            <TextField
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12}>
            <Box sx={{ fontWeight: 'bold' }}>Last Name:</Box>
            <TextField
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Username */}
          <Grid item xs={12}>
            <Box sx={{ fontWeight: 'bold' }}>Username:</Box>
            <TextField
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <Box sx={{ fontWeight: 'bold' }}>Password:</Box>
            <TextField
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Allow Share Checkbox */}
          <Grid item xs={12}>
            <Box sx={{ fontWeight: 'bold' }}>Allow Share:</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={userData.allowShare}
                  onChange={handleCheckboxChange}
                  name="allowShare"
                  color="primary"
                />
              }
              label="Allow sharing of information"
            />
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
