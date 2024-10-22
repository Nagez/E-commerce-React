import { Box, Drawer, Button, List, ListItem, ListItemIcon } from '@mui/material';
import { ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import Item from './Item';
import SidebarHandler from './SidebarHandler';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartActions';
import { addDocument } from '../../firebase/firestoreUtils'
const CURRENCY = '₪';

export default function TemporaryDrawer() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart); // Access cart from Redux
    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0); // total price of items in the cart

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // upload the purchases and clean the cart
    const handleOrder = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return console.log("no user Id")
        cart.forEach(item => {
            const purchase = {
                userId: userId,
                productId: item.id,
                title: item.title,
                quantity: item.quantity,
                purchaseDate: new Date().toISOString(),
                totalAmount: item.quantity * item.price,
            };
            addDocument(purchase, 'purchases'); // Save to Firestore
        });
        dispatch(clearCart()); // Clear cart after order
        alert("order recieved")
    };

    const DrawerList = (
        <Box sx={{ width: 300, padding: 2 }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'left' }}><b>Cart</b></h2>
                <Button onClick={() => dispatch(clearCart())}>Clear</Button>
            </Box>
            <List>
                {cart.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <Item id={item.id} name={item.title} price={item.price} initQuantity={item.quantity} />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>

            {/* Total */}
            <h3 style={{ textAlign: 'left' }}><b>Total: {totalCost}{CURRENCY}</b></h3>
            <Button variant="contained" color="success"
                sx={{
                    backgroundColor: "success.light",
                    '&:hover': {
                        backgroundColor: "success.main"
                    },
                    borderRadius: 8,
                    textTransform: 'none'
                }} onClick={handleOrder}>
                Order
            </Button>
        </Box>
    );

    return (
        <div>
            <SidebarHandler open={open} toggleDrawer={toggleDrawer} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
