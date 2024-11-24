import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from "@mui/material";

const Signin = ({ baseURL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = { email, password };

    try {
      const response = await axios.post(`${baseURL}user/signIn`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to the homepage after successful login
    } catch (err) {
      console.error(err);
      alert("Unable to log you in!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Link to="/">
              <img
                id="logo"
                src="../assets/icon.png"
                alt="Logo"
                style={{ maxWidth: "150px", marginBottom: "1rem" }}
              />
            </Link>
            <Typography variant="h4" fontWeight="bold">
              Sign-In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={signin}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  By continuing, you agree to the site's Conditions of Use and Privacy Notice.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2, py: 1.2 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Continue"}
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                New here?
              </Typography>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1, px: 5, py: 1 }}
                  fullWidth
                >
                  Create Your Account
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signin;
