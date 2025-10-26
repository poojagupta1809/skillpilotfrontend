import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, RadioGroup, FormControl, FormControlLabel, FormLabel, Radio, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Signup() {

 
  const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const[user,setUser]=useState( {"username":"" , "password":"","email":"", "role":"learner"})

   const validateName = (value) => {
       if (value.trim() === '') {
             setErrors(prevErrors => [...prevErrors, "Name is Required"]);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') {
           setErrors(prevErrors => [...prevErrors, "Email Is Required"]);
        } else if (!emailRegex.test(value)) {
            setErrors(prevErrors => [...prevErrors, "Email is not valid"]);
        
        }
    };

 const validatePassword = (value) => {

   if (value.trim() === '') {
        setErrors(prevErrors => [...prevErrors, "Password can not be blank"]);
    } else if (value.length < 8) {
      setErrors(prevErrors => [...prevErrors, "Password must be at least 8 characters long."]);
    } else if (!/[A-Z]/.test(value)) {
      setErrors(prevErrors => [...prevErrors,'Password must contain at least one uppercase letter.']);
    } else if (!/[a-z]/.test(value)) {
      setErrors(prevErrors => [...prevErrors, 'Password must contain at least one lowercase letter.']);
    } else if (!/[0-9]/.test(value)) {
      setErrors(prevErrors => [...prevErrors, 'Password must contain at least one number.']);
    } else if (!/[!@#$%^&*]/.test(value)) {
      setErrors(prevErrors => [...prevErrors, 'Password must contain at least one special character (!@#$%^&*).']);
    } 
    
  }
  
    const handleInput=(event)=>{
        const{name,value} =event.target
        setUser(
            {
                ...user  ,  
                [name] : value 
            }
        );
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== confirmPassword) {
          setErrors(prevErrors => [...prevErrors, "Passwords don't match"]);
    }

    validateName(user.username);
    validateEmail(user.email);
    validatePassword(user.password);
   
    console.log("User-" + user.username + " " + user.password + " " +user.email + " " + user.role);

    axios.post("http://localhost:8088/api/users/register-user",user)
            .then(
                (response)=>
                {
                  //console.log(response.data.token)
                  console.log(response.data.username);
                  console.log("Signup successful ✅");

                 navigate("/SignIn");
               
                  }
            )
            .catch(
                (err)=>
                    {
                       
                      let message = "Server not reachable. Please try again later.";

                      if (err.response) {
                        if (err.response.status === 409) {
                          console.log(err.response.data.error);
                          setErrors(err.response.data.error)
                          message = "UserName/Email Already Exists";
                        } else if (err.response.data) {
                          message = typeof err.response.data === "string"
                            ? err.response.data
                            : err.response.data.message || "Signup failed. Try again.";
                            // setErrors(message); 
                        }
                      }

                      console.error("Backend error:", message);
                        
                    }
            )
    
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
         

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>


        </Box>
      </Box>

     <Snackbar
      open={errors.length>0}
      autoHideDuration={4000}
      onClose={() => setErrors("")}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
     >
      <Alert severity="error" onClose={() => setErrors([])}>
        {errors}
      </Alert>
      </Snackbar>
       </Container>
  );
}

export default Signup;