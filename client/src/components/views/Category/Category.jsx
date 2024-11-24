import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Removed the import for Category since we're using it locally now

const Category = ({ baseURL, categories = [] }) => {  // Default empty array for categories
  const navigate = useNavigate();

  // Redirect to Signin if there's no token and on AdminCategory route
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname === '/admin-category') {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Our Categories</h4>
          {/* Conditionally render the "Add a new Category" button */}
          {window.location.pathname === '/admin-category' && (
            <button className="btn" onClick={() => navigate('/add-category')}>Add a new Category</button>
          )}
        </div>
      </div>
      <div className="row">
        {/* Ensure categories is an array before mapping */}
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
              {/* Using the same 'Category' component here */}
              <Category category={category} /> 
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No categories available</div>  // Display message if no categories
        )}
      </div>
    </div>
  );
};

export default Category;
