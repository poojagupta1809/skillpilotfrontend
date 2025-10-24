import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink} from 'react-router-dom';
import { Link } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function SignIn() {

   const[user,setUser]=useState( {"username":"" , "password":""})


  const handleSubmit = (event) => {
    event.preventDefault();
   
    const data = new FormData(event.currentTarget);
 
      setUser(
            {
                ...user  , 
             username: data.get("userName"),
             password: data.get("password")
            }
        );

    
    console.log("User-" + user.username + " " + user.password);

    axios.post("http://localhost:8087/api/users/login",user)
            .then(
                (response)=>
                {
                  //console.log(response.data.token)
                  sessionStorage.setItem("token",response.data.token)
                  console.log(sessionStorage.getItem("token"))
               
                  }
            )
            .catch(
                (err)=>
                    {
                        console.log("Error occured" )
                           if(err.status=== 401 ){
                               // setError("Invalid username /password")
                                alert("Invalid username /password");
                           }
                    }
                
            )
        
  
    
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
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            
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
    </Container>
  );
}