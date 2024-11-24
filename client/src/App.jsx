import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./components/views/Signin";
import Signup from "./components/views/Signup";
import Home from "./components/views/Home";
import Products from "./components/views/Product/Product";
import Category from "./components/views/Category/Category";
import Cart from "./components/views/Cart/Cart";

const App = () => {
  const baseURL = "https://limitless-lake-55070.herokuapp.com/";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchData(storedToken);
  }, []);

  const fetchData = async (storedToken) => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${baseURL}product/`),
        axios.get(`${baseURL}category/`),
      ]);

      setProducts(productsRes.data);
      setCategories(categoriesRes.data);

      if (storedToken) {
        const cartRes = await axios.get(`${baseURL}cart/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCartCount(Object.keys(cartRes.data.cartItems || {}).length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showNavbarFooter = !["/signup", "/signin"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <div>
      {/* Navbar */}
      {showNavbarFooter && <Navbar cartCount={cartCount} />}

      {/* Main Content */}
      <div style={{ minHeight: "60vh" }}>
        <Routes>
          <Route path="/signin" element={<Signin baseURL={baseURL} />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/" element={<Home baseURL={baseURL} />} />
          <Route path="/products" element={<Products baseURL={baseURL} />} />
          <Route path="/categories" element={<Category baseURL={baseURL} />} />
          <Route path="/cart" element={<Cart baseURL={baseURL} />} />
          
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          
        </Routes>
      </div>

      {/* Footer */}
      {showNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
