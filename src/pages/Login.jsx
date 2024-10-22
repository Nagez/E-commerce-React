// React and external libraries
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../firebase/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

// Material-UI components and icons
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

// Assets
import loginScreenshot from '../assets/loginImage.jpg'; // Adjust the path if necessary

// Internal components
import Copyright from '../components/Copyright';

const defaultTheme = createTheme();

export default function Login() {
    const { login, loginWithGoogle, error } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const navigateBasedOnRole = (userDoc) => {
        if (userDoc?.isAdmin) {
            navigate('/admin');
        } else {
            navigate('/home');
        }
    };
    
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userDoc = await login(username, password);
            navigateBasedOnRole(userDoc);
        } catch (err) {
            console.error('Error during login:', err);
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            const userDoc = await loginWithGoogle();
            navigateBasedOnRole(userDoc);
        } catch (err) {
            console.error('Error during login:', err);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <Box
                            component="img"
                            src={loginScreenshot}
                            alt="Login Screenshot"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                width: '100%',
                                height: 'auto',
                                padding: 2,
                                borderRight: '3px solid lightgray',
                                borderRadius: '2px'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: 2
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User name"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleGoogleLogin}
                                    sx={{ mt: 1, mb: 2 }}
                                >
                                    Sign In with Google
                                </Button>
                                {error && <Typography color="error">{error}</Typography>}
                                <Grid container justifyContent="center">
                                    <Grid item >
                                        New User? {' '}
                                        <Link href="singup" variant="body2">
                                            {"Register"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
