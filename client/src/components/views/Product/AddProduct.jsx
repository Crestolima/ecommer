import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import {
  Container,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";

const AddProduct = ({ baseURL, categories, fetchData }) => {
  const [id, setId] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");  // Use navigate instead of history.push
    }
  }, [navigate]);

  const addProduct = async () => {
    const newProduct = { id, categoryId, name, description, imageURL, price };

    try {
      const response = await axios.post(`${baseURL}product/add`, newProduct, {
        headers: { "Content-Type": "application/json" },
      });

      fetchData(); // Trigger parent component to fetch updated data
      swal({
        text: "Product Added Successfully!",
        icon: "success",
        closeOnClickOutside: false,
      });

      navigate("/admin/product");  // Use navigate instead of history.push
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <h4>Add New Product</h4>
      </Box>

      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Category"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Choose a category for the product</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addProduct}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProduct;
