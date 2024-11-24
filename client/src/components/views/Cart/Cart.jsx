import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Input, Paper, CircularProgress } from '@mui/material';

const Cart = ({ baseURL }) => {
  const [carts, setCarts] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Fetch cart items when the component mounts
  useEffect(() => {
    listCartItems();
  }, []);

  // List cart items
  const listCartItems = async () => {
    try {
      const response = await axios.get(`${baseURL}cart/?token=${token}`);
      if (response.status === 200) {
        const data = response.data;
        setCarts(data);
        const items = data.cartItems.map((item) => ({
          imgUrl: item.product.imageURL,
          pName: item.product.name,
          pDescription: item.product.description,
          pPrice: item.product.price,
          pQuantity: item.quantity,
          id: item.id,
          pId: item.product.id,
          userId: item.userId
        }));
        setCartItems(items);
        setTotalCost(data.totalCost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle checkout
  const checkout = () => {
    navigate('/checkout', { state: { id: cartItems.length } });
  };

  // Show product details
  const showDetails = (index) => {
    navigate(`/product/${cartItems[index].pId}`);
  };

  // Delete an item from the cart
  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${baseURL}cart/delete/${itemId}/?token=${token}`);
      if (response.status === 200) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update item quantity
  const updateItem = async (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, pQuantity: quantity } : item
    );
    setCartItems(updatedCartItems);

    const itemToUpdate = updatedCartItems.find(item => item.id === itemId);
    const { userId, pId } = itemToUpdate;

    try {
      await axios.put(`${baseURL}cart/update/${itemId}/?token=${token}`, {
        id: itemId,
        userId,
        productId: pId,
        quantity
      });
      listCartItems(); // Re-fetch cart items to update the total cost
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the cart is empty
  const isDisabled = () => {
    return cartItems.length === 0;
  };

  if (!cartItems) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <img src={item.imgUrl} alt={item.pName} style={{ width: '100%', borderRadius: 8 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" onClick={() => showDetails(index)} style={{ cursor: 'pointer' }}>
                    {item.pName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.pDescription}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${item.pPrice} per unit
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Quantity:
                    <Input
                      type="number"
                      value={item.pQuantity}
                      onChange={(e) => updateItem(item.id, e.target.value)}
                      sx={{ ml: 2, width: '60px' }}
                    />
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" mt={1}>
                    Total: ${item.pPrice * item.pQuantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteItem(item.id)}
                    sx={{ mt: 1 }}
                  >
                    Remove From Cart
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" textAlign="center">
          Your cart is empty!
        </Typography>
      )}

      <Grid container justifyContent="flex-end" alignItems="center" mt={3}>
        <Grid item xs={12} sm={6} textAlign="right">
          <Typography variant="h5" fontWeight="bold">
            Total Cost: ${totalCost}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={checkout}
            disabled={isDisabled()}
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Cart;
