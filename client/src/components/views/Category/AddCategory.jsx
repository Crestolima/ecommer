import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const AddCategory = ({ baseURL, fetchData }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  // Redirect if the token is not present
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
    }
  }, [navigate]);

  // Handle form submission
  const addCategory = async () => {
    const newCategory = {
      categoryName,
      description,
      imageUrl: imageURL,
    };

    try {
      const response = await axios.post(`${baseURL}category/create`, newCategory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        fetchData(); // Call parent method to fetch updated data
        navigate('/admin-category'); // Navigate to AdminCategory page
        swal({
          text: 'Category Added Successfully!',
          icon: 'success',
          closeOnClickOutside: false,
        });
      }
    } catch (error) {
      console.error(error);
      swal({
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Add New Category
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
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={addCategory}
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

export default AddCategory;
