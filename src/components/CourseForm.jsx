import { TextField, Button, Box, Stack, Typography, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CourseForm() {
  let authorization = 'Bearer ' + sessionStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = authorization;

  const [course, setCourse] = useState({
    topic: '',
    description: '',
    instructor: '',
    difficultyLevel: '',
    imageUrl: '',
    courseType: 'Free', 
    price: ''           
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
      ...(name === 'courseType' && value === 'Free' ? { price: '' } : {}) // reset price if Free
    });
  };

  const handleSubmit = (e) => {
    console.log(course, "coursegettt");
    e.preventDefault();

    if (course.courseType === 'Paid' && (!course.price || Number(course.price) <= 0)) {
      alert("Please enter a valid price greater than 0 for a Paid course.");
      return;
    }

    axios.post("http://localhost:8088/api/courses/add", course)
      .then((response) => {
        console.log(response, "post response");
      })
      .catch((err) => {
        console.log("Error occured", err);
        alert("Not able to create new course");
      });

    setCourse({
      topic: '',
      description: '',
      instructor: '',
      difficultyLevel: '',
      imageUrl: '',
      courseType: 'Free', // reset to default
      price: ''           // reset
    });

    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "90%",
        maxWidth: "900px",
        margin: "auto",
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

      <TextField
        fullWidth
        name="imageUrl"
        label="Image Url"
        value={course.imageUrl}
        onChange={handleChange}
      />

      <TextField
        select
        fullWidth
        name="courseType"
        label="Course Type"
        value={course.courseType}
        onChange={handleChange}
        required
      >
        <MenuItem value="Free">Free</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
      </TextField>

      {course.courseType === 'Paid' && (
        <TextField
          fullWidth
          name="price"
          label="Course Price"
          type="number"
          value={course.price}
          onChange={handleChange}
          required
        />
      )}

      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: "center" }}>
        <Button type="submit" variant="contained">
          Add Course
        </Button>
        <Button type="text" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}
