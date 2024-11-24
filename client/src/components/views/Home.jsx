import { useState, useEffect } from "react";
import { 
  Grid, 
  Typography, 
  Container, 
  Box, 
  Button, 
  Divider 
} from "@mui/material";
import Category from "./Category/Category";
import ProductDetail from "./Product/ProductDetail";

const Home = ({ baseURL, products = [], categories = [] }) => {
  const [categorySize, setCategorySize] = useState(0);
  const [productSize, setProductSize] = useState(0);

  useEffect(() => {
    // Limit the number of categories and products to display
    setCategorySize(Math.min(categories?.length || 0, 6));
    setProductSize(Math.min(products?.length || 0, 8));
  }, [categories?.length, products?.length]);

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/path-to-image.jpg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
          textAlign: "left",
          py: 8,
          px: 3,
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Start Shopping Now
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="#start-shopping"
            sx={{
              backgroundColor: "#ff6f61",
              color: "white",
              borderRadius: 2,
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#e65a4f",
              },
            }}
          >
            Shop Now
          </Button>
          <Typography
            variant="body1"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              mt: 3,
              p: 2,
              borderRadius: 1,
              maxWidth: "600px",
            }}
          >
            Simple Coding Market is for educational purposes only. It provides developers an opportunity to learn about building an eCommerce application complete with backend and frontend for Web and Android.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 5 }}>
        {/* Categories Section */}
        <Typography 
          variant="h4" 
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Top Categories
        </Typography>
        <Grid container spacing={4}>
          {categories?.slice(0, categorySize)?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Category category={category} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Products Section */}
        <Typography 
          variant="h4" 
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Top Products
        </Typography>
        <Grid container spacing={4}>
          {products?.slice(0, productSize)?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductDetail product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
