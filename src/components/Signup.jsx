import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, RadioGroup, FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material';
import axios from 'axios';

function Signup() {

 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError]=useState("")

  const[user,setUser]=useState( {"username":"" , "password":"","email":"", "role":"learner"})

    const handleInput=(event)=>{
        const{name,value} =event.target
        setUser(
            {
                ...user  ,  // keet the other form data as it is
                [name] : value // change value of only the current text box with this name 
            }
        );
    }

  const handleSubmit = (event) => {
    event.preventDefault();

   
    // Implement validation logic here
    if (user.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
   
    console.log("User-" + user.username + " " + user.password + " " +user.email + " " + user.role);

    axios.post("http://localhost:8088/api/users/register-user",user)
            .then(
                (response)=>
                {
                  //console.log(response.data.token)
                  console.log(response.data.username);
               
                  }
            )
            .catch(
                (err)=>
                    {
                       console.log(err)
                            if(err.status=== 403 )
                                setError("Invalid username /password")
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
    </Container>
  );
}

export default Signup;