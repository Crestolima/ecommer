import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const EditCategory = ({ baseURL, categories }) => {
  const { id } = useParams(); // Getting category ID from route params
  const navigate = useNavigate();
  
  // State variables for the form fields
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Find the category from the categories prop based on the ID
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
      return;
    }

    const category = categories.find(category => category.id === parseInt(id));
    if (category) {
      setCategoryName(category.categoryName);
      setDescription(category.description);
      setImageUrl(category.imageUrl);
    }
  }, [id, categories, navigate]);

  // Handle category update
  const editCategory = async () => {
    const updatedCategory = {
      id: parseInt(id),
      categoryName,
      description,
      imageUrl,
      products: null, // Assuming we don't need products in the update request
    };

    try {
      await axios.post(`${baseURL}category/update/${id}`, updatedCategory, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Navigate to Admin Category page after success
      navigate('/admin-category');
      
      // Show success alert (can use a package like swal or use a custom modal)
      alert("Category Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update category.");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Edit Category
      </Typography>

      <form>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Image URL"
              type="url"
              fullWidth
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={editCategory}
              sx={{ px: 4 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditCategory;
