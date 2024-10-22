import { useEffect, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { getDocuments } from '../../firebase/firestoreUtils'; 
import { getPurchasesByUser } from '../../firebase/firestorePurchasesUtils';
import UserOrdersTable from '../orders/UserOrdersTable';

export default function Customers() {
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    const loadCustomersData = async () => {
      try {
        // Fetch all users from the Firestore 'users' collection using getDocuments
        const users = await getDocuments('users');
        const customers = [];

        // Loop through each user
        for (const user of users) {
          if (user.isAdmin) continue;

          // Fetch purchases for the current user
          const userPurchases = await getPurchasesByUser(user.id);

          // Add customer data to the array
          customers.push({
            fullname: user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.displayName || 'No Name Available',
            joinedAt: user?.joinedAt, 
            productsBought: userPurchases.length <= 0 ? 'No purchases' : <UserOrdersTable purchases={userPurchases}/>,
          });
        }

        // Update state with the fetched customers data
        setCustomersData(customers);
      } catch (error) {
        console.error('Error fetching customers data:', error);
      }
    };

    loadCustomersData();
  }, []);

  const columns = [
    { label: 'Full Name', field: 'fullname' },
    { label: 'Joined At', field: 'joinedAt' },
    { label: 'Products Bought', field: 'productsBought' },
  ];

  return (
    <div>
      <TableComponent columns={columns} data={customersData} />
    </div>
  );
}
