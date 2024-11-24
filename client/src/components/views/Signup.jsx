import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const Signup = ({ baseURL }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      setLoading(true);
      const user = {
        email,
        firstName,
        lastName,
        password,
      };

      try {
        const response = await axios.post(`${baseURL}user/signup`, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        swal({
          text: "User signup successful. Please Login",
          icon: "success",
          closeOnClickOutside: false,
        });
        navigate("/signin");
      } catch (error) {
        console.error(error);
        swal({
          text: "Error during signup. Please try again.",
          icon: "error",
          closeOnClickOutside: false,
        });
      } finally {
        setLoading(false);
      }
    } else {
      swal({
        text: "Error! Passwords do not match.",
        icon: "error",
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} textAlign="center">
            <a href="/home">
              <img
                id="logo"
                src="../assets/icon.png"
                alt="Logo"
                style={{ maxWidth: "150px", marginBottom: "1rem" }}
              />
            </a>
            <Typography variant="h4" fontWeight="bold">
              Create Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSignup}>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      type="text"
                      variant="outlined"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      type="text"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2, py: 1.2 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already Have an Account?
              </Typography>
              <a href="/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1, px: 5, py: 1 }}
                  fullWidth
                >
                  Signin Here
                </Button>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
