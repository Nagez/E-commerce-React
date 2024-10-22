import { useEffect, useState } from 'react';
import { getDocById, getDocuments } from '../../firebase/firestoreUtils';
import TableComponent from '../../components/TableComponent';

export default function BoughtByTable({ productId }) {
  const [data, setData] = useState([]); //data for table rows

  {/*Table columns */}
  const columns = [
    { label: 'Name', field: 'name' },
    { label: 'Qty', field: 'qty' },
    { label: 'Date', field: 'date' },
  ];

  const loadBoughtBy = async () => {
    try {
      const boughtData = [];
      const purchases = await getDocuments('purchases');
      const productPurchases = purchases.filter(purchase => purchase.productId === productId);
      
      for (const purchase of productPurchases) {
        const user = await getDocById('users', purchase.userId);
        boughtData.push({
          name: user ? (user.firstName || user.userName) : 'User deleted',
          qty: purchase.quantity,
          date: purchase.purchaseDate,
        });
      }
      
      setData(boughtData);
    } catch (error) {
      console.error('Error fetching Bought By data: ', error);
    }
  };

  useEffect(() => {
    if (productId) {
      loadBoughtBy();
    }
  }, [productId]);

  return (
    <TableComponent columns={columns} data={data} />
  );
}
