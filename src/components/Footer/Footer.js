import React from 'react';
import { Grid, Container, Box } from '@mui/material';
import { Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Box 
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 7 }}
        color="white" 
        bgcolor="#1b1b1d"
        
        >
        <Container maxWidth="lg" >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box >
                <img width="150px" src="https://egy.voxcinemas.com/assets/images/logo-dark-288x92.png" />
              </Box>
              
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box ><h4>About</h4></Box>
              <hr width="100px"/>
              <Box>
                <Link href="/developers" color="inherit" style={{textDecoration: 'none'}}>
                  About Us
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" style={{textDecoration: 'none'}}>
                  Developers
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" style={{textDecoration: 'none'}}>
                  Privacy
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={0}><h4>Help</h4></Box>
              <hr width="100px"/>
              <Box>
                <Link href="/" color="inherit" style={{textDecoration: 'none'}}>
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" style={{textDecoration: 'none'}}>
                  Support
                </Link>
              </Box>
              
            </Grid>

          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer;

  