import { Box, Typography } from '@mui/material';
import TableComponent from '../../components/TableComponent';

export default function UserOrdersTable({ purchases }) {
  const columns = [
    { label: 'Title', field: 'title' },
    { label: 'Qty', field: 'qty' },
    { label: 'Total', field: 'total' },
    { label: 'Date', field: 'date' },
  ];

  const transformedPurchases = purchases.map(purchase => ({
    id: purchase.productId,
    title: purchase.title, 
    qty: purchase.quantity,
    total: `$${purchase.totalAmount.toFixed(2)}`,
    date: new Date(purchase.purchaseDate).toLocaleDateString(),
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {transformedPurchases.length > 0 ? (
        <TableComponent columns={columns} data={transformedPurchases} />
      ) : (
        <Typography variant="body1">No orders available</Typography>
      )}
    </Box>
  );
}
