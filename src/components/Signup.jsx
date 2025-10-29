import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Snackbar, Alert, Grid, Paper } from '@mui/material';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import SignIn from './SignIn';


function Signup() {


  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const [user, setUser] = useState({ "username": "", "password": "", "email": "", "role": "learner" })

  const validateName = (value) => {
    const errs = [];
    if (!value || value.trim() === '') {
      errs.push("Name is required");
    }
    return errs;
  };

  const validateEmail = (value) => {
    const errs = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || value.trim() === '') {
      errs.push("Email is required");
    } else if (!emailRegex.test(value)) {
      errs.push("Email is not valid");
    }
    return errs;
  };

  const validatePassword = (value) => {
    const errs = [];
    if (!value || value.trim() === '') {
      errs.push("Password cannot be blank");
    } else {
      if (value.length < 8) {
        errs.push("Password must be at least 8 characters long.");
      }
      if (!/[A-Z]/.test(value)) {
        errs.push('Password must contain at least one uppercase letter.');
      }
      if (!/[a-z]/.test(value)) {
        errs.push('Password must contain at least one lowercase letter.');
      }
      if (!/[0-9]/.test(value)) {
        errs.push('Password must contain at least one number.');
      }
      if (!/[!@#$%^&*]/.test(value)) {
        errs.push('Password must contain at least one special character (!@#$%^&*).');
      }
    }
    return errs;
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    setUser(
      {
        ...user,
        [name]: value
      }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = [];

    validationErrors.push(...validateName(user.username));
    validationErrors.push(...validateEmail(user.email));
    validationErrors.push(...validatePassword(user.password));

    if (user.password !== confirmPassword) {
      validationErrors.push("Passwords don't match");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("User-" + user.username + " " + user.password + " " + user.email + " " + user.role);

    axios.post("http://localhost:8088/api/users/register-user", user)
      .then(
        (response) => {
          console.log(response.data.username);
          console.log("Signup successful");

          navigate("/SignIn");

        }
      )
      .catch(
        (err) => {
          // Normalize backend errors into an array of strings
          let serverErrors = [];

          if (err.response) {
            // try common API shapes
            const data = err.response.data;
            if (Array.isArray(data)) {
              serverErrors = data.map(String);
            } else if (data && typeof data === 'object') {
              // prefer `error` or `errors` or `message`
              if (data.error) {
                serverErrors = Array.isArray(data.error) ? data.error.map(String) : [String(data.error)];
              } else if (data.errors) {
                serverErrors = Array.isArray(data.errors) ? data.errors.map(String) : [String(data.errors)];
              } else if (data.message) {
                serverErrors = [String(data.message)];
              } else {
                serverErrors = [JSON.stringify(data)];
              }
            } else {
              serverErrors = [String(data)];
            }

            if (err.response.status === 409 && err.response.data && err.response.data.error) {
              serverErrors = Array.isArray(err.response.data.error) ? err.response.data.error.map(String) : [String(err.response.data.error)];
            }
          } else {
            serverErrors = ["Server not reachable. Please try again later."];
          }

          setErrors(serverErrors);

          console.error("Backend error:", serverErrors);

        }
      )

  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrors([]);
  };

  return (

   <Container maxWidth={false} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
     
      <Grid container component="main" sx={{ height: '100vh'}} >

        <Grid item xs={12}  sm={4} md={6} sx={{
          p: { xs: 3,md:14 }
        }}> 
          <Box
            component="img"
            src="./public/signup.png" // Replace with your image URL
            alt="Descriptive alt text for your image"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '300px', // Optional: limit image height
              objectFit: 'contain',
            }}
          />
        </Grid>

        {/* Sign-up Form Section */}
           <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // ✅ push form to extreme right
          p: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 380, // ✅ keeps form narrow
            mr: { md: 6, xs: 0 }, // ✅ adds right spacing from edge
            textAlign: 'center',
          }}
        >     
            <Typography component="h1" variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Sign Up
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleInput}
                value={user.username}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInput}
                value={user.email}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInput}
                value={user.password}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>

        <Box>
             <Link component={RouterLink} to="/signin">
                {"Already have an account? Sign In"}
              </Link>
              </Box>

            </Box>
          </Box>
        </Grid>
        <Snackbar open={errors.length > 0} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" onClose={handleSnackClose} sx={{ whiteSpace: 'normal' }}>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>{errors.map((errMsg, idx) => (<li key={idx}>{errMsg}</li>))}</ul>
          </Alert>
        </Snackbar>

      </Grid>
      </Container>
  


  );
}

export default Signup;

