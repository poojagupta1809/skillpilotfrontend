 import { TextField, Button, Box,Stack ,Typography} from '@mui/material';
    import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

    export default function CourseForm( ) {
     let authorization = 'Bearer ' + sessionStorage.getItem("token");
     axios.defaults.headers.common['Authorization'] = authorization;
      
      const [course, setCourse] = useState( { topic: '', description: '', instructor: '' ,difficultyLevel:''});
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ 
            ...course,
             [name]: value });
      };

      
      const handleSubmit = (e) => {
         console.log(course,"coursegettt");
        e.preventDefault();
        axios.post("http://localhost:8088/api/courses/add",course)
            .then(
                (response)=>
                {
                   
                   console.log(response,"post response")
                  }
            )
            .catch(
                (err)=>
                    {
                        console.log("Error occured",err )
                          
                               // setError("Invalid username /password")
                                alert("Not able to create new course");
                          
                    }
                
            )
        
        setCourse({ topic: '', description: '', instructor: '',difficultyLevel:'' });
         // Clear form after submission
         navigate('/admin')
      };

      const handleCancel=()=>{
            navigate('/admin')
      }
      return (
    <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "90%",        // wider form
    maxWidth: "900px",   // medium max width
    margin: "auto",      // center on page
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
  }}
>
   <Typography variant="h4" align="center" gutterBottom sx={{ color: "primary.main", fontWeight: 400 }}>
  Create New Course
</Typography>
  <TextField
    fullWidth
    name="topic"
    label="Course Title"
    value={course.topic}
    onChange={handleChange}
    required
  />
  
  <TextField
    fullWidth
    name="description"
    label="Description"
    value={course.description}
    onChange={handleChange}
    multiline
    rows={4}
  />
  
  <TextField
    fullWidth
    name="instructor"
    label="Instructor"
    value={course.instructor}
    onChange={handleChange}
    required
  />
  
  <TextField
    fullWidth
    name="difficultyLevel"
    label="Difficulty Level"
    value={course.difficultyLevel}
    onChange={handleChange}
    required
  />
    <Stack spacing={2} direction="row"  sx={{alignItems: 'center', justifyContent: "center",  }}> 
  <Button type="submit" variant="contained" >
    Add Course
  </Button>
  <Button type="text" variant="outlined" onClick={handleCancel}>
    Cancel
  </Button>
  </Stack>
</Box>
      );
    }