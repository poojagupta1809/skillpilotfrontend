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
import { useNavigate } from "react-router-dom";

export default function SignIn() {

   const[user,setUser]=useState( {"username":"" , "password":""})
    const navigate = useNavigate()

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
   
    const data = new FormData(event.currentTarget);
 
    
    console.log("User-" + user.username + " " + user.password);

    axios.post("http://localhost:8088/api/users/login",user)
            .then(
                (response)=>
                {
                  sessionStorage.setItem("token",response.data.token)
                  sessionStorage.setItem("username",response.data.user.username)
                  sessionStorage.setItem("role",response.data.user.role)
                  sessionStorage.setItem("userId",response.data.user.userId)
                  
                  console.log("Session token - " + sessionStorage.getItem("token"))
                  console.log(sessionStorage.getItem("username"))
                  console.log(sessionStorage.getItem("role"))
                  console.log("user id - " + sessionStorage.getItem("userId"))


              
                  if(response.data.user.role === 'ADMIN')
                  {
                     navigate("/admin");
                  }

              
               
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
    </Container>
  );
}