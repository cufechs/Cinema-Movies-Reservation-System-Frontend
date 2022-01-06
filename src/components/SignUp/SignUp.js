import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useSignupUserMutation } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/userSlice';
import { useSnackbar } from 'notistack';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupUser] = useSignupUserMutation();

  const [isManager, setIsManager] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant, msg) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let user = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email'),
      //role: isManager ? "manager" : "customer",
      role: "customer",
      mobile_number: data.get('phone'),
      management_request: isManager ? 1 : 0
    };

    console.log("user: ", user);
    
    try {
      await signupUser(user)
      .then(res => {
        console.log("response: ", res)
        console.log("status: ",res.data.status)
        if (res.data.status) {
          console.log("loggin in")
          dispatch(userActions.login(user));
          handleClickVariant('success', 'Signed Up Successfully!');
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
      handleClickVariant('error', 'Error signup');
    }
  };

  const handleManagerCheck = (e) => {
    setIsManager(e.target.checked)
  }

  return (
    <ThemeProvider theme={theme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" onChange={(e) =>handleManagerCheck(e)} color="primary" />}
                  label="Manager"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}