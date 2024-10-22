import { Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyAccount from "../features/MyAccount";
import Orders from "../features/orders/Orders";
import SideBar from "../features/sidebar/Sidebar"
import useAuth from "../firebase/useAuth";
import ProductCatalog from "../features/productCatalog/ProductCatalog";

export default function CustomerPage() {
    const navigate = useNavigate(); // Initialize useNavigate
    const { logout, error } = useAuth(); 

    const [activeComponent, setActiveComponent] = useState(null);

    const handleHeaderClick = (item) => {
        if (item === 'Log Out') {
            logout()
            navigate('/'); // Navigate to the login page
        } else {
            setActiveComponent(item); // Set the active component for others
        }
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Products':
                return <ProductCatalog />;
            case 'My Orders':
                return <Orders />;
            case 'My Account':
                return <MyAccount />;
            default:
                return <div>Please select a section above.</div>;
        }
    };

    return (
        <>
        <SideBar />
        <Box sx={{
            margin: '0 auto', // Center horizontally
            padding: '16px', // Add padding for spacing
        }}>
            <Box display="flex" justifyContent="center" gap={2} mb={4}>
                {['Products', 'My Orders', 'My Account', 'Log Out'].map((item, index) => (
                    <Button key={index} onClick={() => handleHeaderClick(item)} variant="contained">
                        {item}
                    </Button>
                ))}
            </Box>
            <Box>
                {renderComponent()}
            </Box>
        </Box>
        </>
    );
}
