import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import { Snackbar, Box, Alert } from '@mui/material';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const [user, setUser] = useState({ "username": "", "password": "" })
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleInput = (event) => {
    const { name, value } = event.target
    setUser(
      {
        ...user,
        [name]: value //
      }
    );
  }
  const validateName = (value) => {
    const errs = [];
    if (!value || value.trim() === '') {
      errs.push("Name is required");
    }
    return errs;
  };


  const validatePassword = (value) => {
    const errs = [];
    if (!value || value.trim() === '') {
      errs.push("Password cannot be blank");
    }

    return errs;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = [];

    validationErrors.push(...validateName(user.username));
    validationErrors.push(...validatePassword(user.password));

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData(event.currentTarget);


    console.log("User-" + user.username + " " + user.password);

    axios.post("http://localhost:8088/api/users/login", user)
      .then(
        (response) => {
          sessionStorage.setItem("token", response.data.token)
          sessionStorage.setItem("username", response.data.user.username)
          sessionStorage.setItem("role", response.data.user.role)
          sessionStorage.setItem("userId", response.data.user.userId)

          console.log("Session token - " + sessionStorage.getItem("token"))
          console.log("User name -" + sessionStorage.getItem("username"))
          console.log("Role-" + sessionStorage.getItem("role"))
          console.log("user id - " + sessionStorage.getItem("userId"))


          if (response.data.user.role === 'ADMIN') {
            navigate("/admin");
          }
          else (
            navigate("/courses")
          )

        }
      )
      .catch(
        (err) => {
          console.log("Error in Sign In ")
          let serverErrors = [];

          if (err.response) {
            const data = err.response.data;

            // Handle different possible shapes of backend errors
            if (typeof data === "string") {
              serverErrors.push(data);
            } else if (Array.isArray(data)) {
              serverErrors = data;
            } else if (data.error) {
              // Single error field (common)
              serverErrors.push(data.error);
            } else if (data.errors && Array.isArray(data.errors)) {
              // Many frameworks return `errors: [ ... ]`
              serverErrors = data.errors;
            } else {
              serverErrors.push("An unknown error occurred.");
            }
          } else if (err.message) {
            serverErrors.push(err.message);
          } else {
            serverErrors.push("Network error. Please try again.");
          }
          console.error("Server Errors:", serverErrors);
          setErrors(serverErrors);
        }

      )



  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrors([]);
  };


  return (

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInput}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>

            <Grid item>

              <Link component={RouterLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>

            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={errors.length > 0}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleSnackClose} sx={{ whiteSpace: 'normal' }}>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {errors.map((errMsg, idx) => (
              <li key={idx}>{errMsg}</li>
            ))}
          </ul>
        </Alert>
      </Snackbar>

    </Container>
  );
}