import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Alert } from '@mui/material';
import ProductBox from '../../components/Product/ProductBox';

const ListProducts = ({ baseURL, categories }) => {
  const { id } = useParams(); // Extracting category ID from route params

  const [category, setCategory] = useState({});
  const [msg, setMsg] = useState('');
  const [len, setLen] = useState(0);

  useEffect(() => {
    // Finding the category based on ID
    const categoryIndex = categories.findIndex(category => category.id === parseInt(id));
    if (categoryIndex !== -1) {
      const selectedCategory = categories[categoryIndex];
      setCategory(selectedCategory);

      // Setting length of products and the appropriate message
      const productCount = selectedCategory.products?.length || 0;
      setLen(productCount);

      if (productCount === 0) {
        setMsg("Sorry, no products found");
      } else if (productCount === 1) {
        setMsg("Only 1 product found");
      } else {
        setMsg(`${productCount} products found`);
      }
    }
  }, [id, categories]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <Typography variant="h4" gutterBottom>
            {category.categoryName}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {msg}
          </Typography>
        </div>
      </div>

      <Grid container spacing={3} justifyContent="center">
        {/* Display an alert message when there are no products */}
        {len === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ padding: 3 }}>
              <Alert severity="info">
                Sorry, no products found in this category.
              </Alert>
            </Paper>
          </Grid>
        )}

        {/* Display the products in a grid */}
        {category.products?.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductBox product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListProducts;
