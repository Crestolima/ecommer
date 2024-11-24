import React from "react";
import { Box, Grid, Typography, Link as MuiLink } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "darkslategray",
        color: "white",
        py: 5,
        mt: 5,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        {/* Footer Links */}
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Get to Know Us
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  About Us
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Android App
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  iOS App
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Facebook
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Twitter
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Instagram
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Make Money With Us
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Sell with Us
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Become an Affiliate
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Advertise Your Products
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* Column 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Let Us Help You
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Return Centre
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  100% Purchase Protection
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  Help
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="#"
                  sx={{ color: "white", textDecoration: "none", fontWeight: "light" }}
                >
                  App Download
                </MuiLink>
              </li>
            </ul>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <img
            src="/assets/icon.png"
            alt="Logo"
            style={{ height: "40px", marginBottom: "10px" }}
          />
          <Typography variant="body2" color="gray">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
