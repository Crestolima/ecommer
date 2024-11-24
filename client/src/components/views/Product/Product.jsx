import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import ProductDetail from "./ProductDetail";

const Products = ({ baseURL, products = [] }) => { // Default empty array for products
  const navigate = useNavigate();

  // Redirect to signin if the route is AdminProduct and no token is found
  useEffect(() => {
    if (window.location.pathname === "/admin/product" && !localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Products
            </Typography>
            {window.location.pathname === "/admin/product" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin/product/add")}
                sx={{ mb: 3 }}
              >
                Add a New Product
              </Button>
            )}
          </Grid>

          {/* Show loading spinner if products are still being fetched */}
          <Grid container spacing={2}>
            {products.length === 0 ? (
              <Grid item xs={12} textAlign="center">
                <CircularProgress />
              </Grid>
            ) : (
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductDetail product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Products;
