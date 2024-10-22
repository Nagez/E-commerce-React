import React from 'react';
import {Box} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 

export default function SidebarHandler({ open, toggleDrawer }) {
    return (
        <Box
            sx={{
                width: 50, // Width of the rectangle
                height: 100, // Height of the rectangle
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                left: open ? 310 : 0, // Adjust based on drawer's state
                top: '50%',
                transform: 'translateY(-50%)',
                borderTopRightRadius: open ? 0 : 8, // No rounded corner when open
                borderBottomRightRadius: open ? 0 : 8, // No rounded corner when open
                borderTopLeftRadius: open ? 8 : 0, // Rounded corner when open
                borderBottomLeftRadius: open ? 8 : 0, // Rounded corner when open
                boxShadow: 3,
                cursor: 'pointer',
                zIndex: 1300, // Ensure it's above other elements
            }}
            onClick={toggleDrawer(!open)}
        >
            🛒{open ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </Box>
    );
}
