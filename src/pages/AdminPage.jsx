import { Button, Box } from "@mui/material";
import Categories from "../features/categories/Categories";
import { useState } from "react";
import Customers from "../features/customers/Customers";
import Products from "../features/Products/Products";
import Statistics from "../features/statistics/Statistics";
import { useNavigate } from "react-router-dom";
import useAuth from "../firebase/useAuth";

export default function AdminPage() {
    const [activeComponent, setActiveComponent] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const { logout, error } = useAuth(); 

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
            case 'Categories':
                return <Categories />;
            case 'Products':
                return <Products />;
            case 'Customers':
                return <Customers />;
            case 'Statistics':
                return <Statistics />;
            default:
                return <div>Please select a section above.</div>;
        }
    };

    return (
        <Box sx={{
            margin: '0 auto', // Center horizontally
            padding: '16px', // Add padding for spacing
        }}>
            <h3 style={{ textAlign: 'center' }}>Hello, Admin</h3>
            <Box display="flex" justifyContent="center" gap={2} mb={4}>
                {['Categories', 'Products', 'Customers', 'Statistics','Log Out'].map((item, index) => (
                    <Button key={index} onClick={() => handleHeaderClick(item)} variant="contained">
                        {item}
                    </Button>
                ))}
            </Box>
            <Box>
                {renderComponent()}
            </Box>
        </Box>
    );
}
