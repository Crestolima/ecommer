import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import swal from "sweetalert2";

const ProductDetail = ({ baseURL, products, categories }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook
  
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [wishlistString, setWishlistString] = useState("Add to wishlist");
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product data by ID
    const foundProduct = products.find((product) => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const foundCategory = categories.find(
        (category) => category.id === foundProduct.categoryId
      );
      setCategory(foundCategory);
    }
    setIsLoading(false); // Set loading to false once data is fetched
  }, [id, products, categories]);

  const addToWishList = (productId) => {
    axios
      .post(`${baseURL}wishlist/add?token=${token}`, { id: productId })
      .then((response) => {
        if (response.status === 201) {
          setIsAddedToWishlist(true);
          setWishlistString("Added to WishList");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addToCart = (productId) => {
    axios
      .post(`${baseURL}cart/add?token=${token}`, { productId, quantity })
      .then((response) => {
        if (response.status === 201) {
          swal({
            text: "Product Added to the cart!",
            icon: "success",
            closeOnClickOutside: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const listCartItems = () => {
    axios
      .get(`${baseURL}cart/?token=${token}`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/cart"); // Use navigate instead of history.push
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // If loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 col-12 text-center">
          <img
            src={product.imageURL}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6 col-12 pt-3 pt-md-0">
          <h4>{product.name}</h4>
          <h6 className="category font-italic">{category?.categoryName}</h6>
          <h6 className="font-weight-bold text-success">${product.price}</h6>
          <p>{product.description}</p>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="input-group col-md-4 col-6 p-0 mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Quantity</span>
              </div>
              <input
                className="form-control"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>

            <div className="col-md-4 col-6 p-0 mb-3">
              <button
                type="button"
                id="add-to-cart-button"
                className="btn btn-primary w-100"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
                <ion-icon name="cart-outline" />
              </button>
            </div>
          </div>

          <div className="features pt-3">
            <h5>
              <strong>Features</strong>
            </h5>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Officia quas, officiis eius magni error magnam voluptatem.</li>
              <li>Molestias ipsum ab, ipsa consectetur laboriosam soluta et.</li>
              <li>Ut doloremque dolore corrupti, architecto iusto beatae.</li>
            </ul>
          </div>

          <button
            id="wishlist-button"
            className="btn btn-warning mr-3 p-1 py-0"
            style={{
              backgroundColor: isAddedToWishlist ? "#febd69" : "#b9b9b9",
            }}
            onClick={() => addToWishList(product.id)}
          >
            {wishlistString}
          </button>
          <button
            id="show-cart-button"
            type="button"
            className="btn btn-outline-secondary p-1 py-0"
            onClick={listCartItems}
          >
            Show Cart
            <ion-icon name="cart-outline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
