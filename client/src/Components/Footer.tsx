import React from "react";
import { Box, Container, Grid, Link } from "@material-ui/core";

export default function Footer() {
  return (
    <footer>
      <Box
        bgcolor="rgba(35,170,170,1.00)"
        color="white"
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>FOR PARENTS</Box>
              <Box>
                <Link href="/" color="inherit">
                  Parent Resources
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  How it Works
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Testimonials
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Term of Use
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>For Parents</Box>
              <Box>
                <Link href="/" color="inherit">
                  Provider Resources
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  How it Works
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Testimonials
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  List Your Program
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>MORE</Box>
              <Box>
                <Link href="/" color="inherit">
                  About Us
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Press
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Jobs
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact Us
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
