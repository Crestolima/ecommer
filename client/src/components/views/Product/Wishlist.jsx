import { useState, useEffect } from "react";
import axios from "axios";
import ProductBox from "../../components/Product/ProductBox"; // Ensure this component is created

const Wishlist = ({ baseURL }) => {
  const [products, setProducts] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Function to fetch the wishlist products
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${baseURL}wishlist/${token}`);
      setProducts(response.data); // Set the fetched products to state
    } catch (err) {
      console.log("Error fetching wishlist:", err);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage); // Get the token from localStorage

    if (tokenFromStorage) {
      fetchWishlist(); // Fetch the wishlist if token exists
    } else {
      setIsLoading(false); // If no token, stop loading
    }
  }, [baseURL]); // Effect will run when baseURL changes

  // If no token, show a login prompt
  if (!token) {
    return (
      <div className="container text-center py-5">
        <h4>Please log in to view your wishlist.</h4>
      </div>
    );
  }

  // If products are not yet fetched, show loading spinner
  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center">
          <h4>Your WishList</h4>
        </div>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="col-md-6 col-lg-4 col-12 pt-3 d-flex justify-content-center"
            >
              <ProductBox product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products in your wishlist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
