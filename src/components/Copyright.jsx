import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'© By '}
            <Link color="inherit" href="https://github.com/Nagez">
                Or Nagar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
  )
}