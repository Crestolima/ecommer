import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Typography, Box } from "@mui/material";
import OrderItems from "../../components/Order/OrderItems";

const OrderItemsView = ({ baseURL }) => {
  const { id: orderID } = useParams(); // Retrieve the `id` parameter from the URL
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array ensures this runs only once

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Order Details
        </Typography>
        <OrderItems orderID={orderID} baseURL={baseURL} />
      </Box>
    </Container>
  );
};

export default OrderItemsView;
