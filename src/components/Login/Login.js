import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from './cinema_logo.png';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/userSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [redirect, SetRedirect] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    let loginInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      await login(loginInfo)
      .then(res => {
        console.log("response: ", res)
        console.log("status: ",res.data.status);
        loginInfo = { ...loginInfo, ...res.data.data}
        if (res.data.status) {
          console.log("logging in")
          dispatch(userActions.login(loginInfo));
          navigate("/");

        }
      });
    } catch {
      console.log({
        title: 'An error occurred',
        description: "We create new user, try again!",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

    //SetRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img src={logo} alt="site-logo" width="70px" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
              
          </Box>
        </Box>

      </Container>
  );
}

export default Login;