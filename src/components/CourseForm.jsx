 import { TextField, Button, Box } from '@mui/material';
    import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

    export default function CourseForm( ) {
      const [course, setCourse] = useState( { topic: '', description: '', instructor: '' ,difficultyLevel:''});
      const navigate = useNavigate();

    //   useEffect(() => {
    //     setCourse( {topic: '', description: '', instructor: '',difficultyLevel:'' });
    //   }, [ ]);

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
         navigate('/')
      };

      return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display:'flex',alignContent:'center' ,alignItems:'center',flexDirection: 'column', gap: 2 }}>
          <TextField name="topic" label="Course Title" value={course.topic} onChange={handleChange} required />
          <TextField name="description" label="Description" value={course.description} onChange={handleChange} multiline rows={4} />
          <TextField name="instructor" label="Instructor" value={course.instructor} onChange={handleChange} required />
          <TextField name="difficultyLevel" label="difficultyLevel" value={course.difficultyLevel} onChange={handleChange} required />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Add Course
          </Button>
        </Box>
      );
    }