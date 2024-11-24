import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardMedia, Grid, Typography, Divider } from "@mui/material";

const Orders = ({ baseURL }) => {
  const [token, setToken] = useState(null);
  const [orderList, setOrderList] = useState([]);

  // Fetch order history
  const listOrders = async () => {
    try {
      const response = await axios.get(`${baseURL}order/?token=${token}`);
      if (response.status === 200) {
        const orders = response.data;

        // Map API response to orderList structure
        const formattedOrders = orders.map((order) => ({
          id: order.id,
          totalCost: order.totalPrice,
          orderdate: order.createdDate.substring(0, 10), // Extract date in YYYY-MM-DD
          imageURL: order.orderItems[0]?.product?.imageURL || "", // Default empty if no image
          totalItems: order.orderItems.length,
        }));

        setOrderList(formattedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch token and orders on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      listOrders();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <Typography variant="h4" gutterBottom>
            Your Orders
          </Typography>
        </div>
      </div>

      <Grid container spacing={3} justifyContent="center">
        {orderList.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={order.imageURL}
                alt={`Order ${order.id}`}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">
                  <Link to={`/order/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Order No: {order.id}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.totalItems} item{order.totalItems > 1 ? "s" : ""}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  Total Cost: ${order.totalCost}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ordered on: {order.orderdate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Orders;
