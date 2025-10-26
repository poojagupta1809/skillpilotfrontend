import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Stack } from "@mui/material";

export default function CourseItem() {

  const navigate = useNavigate();
  const { courseId } = useParams();   

  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios.get(`http://localhost:8088/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
        setEditedCourse(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("Course not found!");
        navigate("/admin");
      });
  }, [courseId]);

  if (loading) return <h3>Loading course...</h3>;

   
  const handleChange = (e) => {
    setEditedCourse({
      ...editedCourse,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8088/api/courses/${courseId}`, editedCourse)
      .then((response) => {
        alert("Course Updated Successfully!");
        setCourse(response.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log("Error occurred", err);
        alert("Not able to update course");
      });
  };

  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedCourse(course);   
  };

  return (
    <>
      {isEditing ? (
    
        <Box component="form" onSubmit={handleSubmit}
          sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}
        >
          <TextField name="topic" label="Course Title" value={editedCourse.topic} onChange={handleChange} required />
          <TextField name="description" label="Description" value={editedCourse.description} onChange={handleChange} multiline rows={4} />
          <TextField name="instructor" label="Instructor" value={editedCourse.instructor} onChange={handleChange} required />
          <TextField name="difficultyLevel" label="Difficulty Level" value={editedCourse.difficultyLevel} onChange={handleChange} required />

          <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained">Save</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </Stack>
        </Box>
      ) : (
     
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
          <TextField label="Course Title" value={course.topic} InputProps={{ readOnly: true }} />
          <TextField label="Description" value={course.description} multiline rows={4} InputProps={{ readOnly: true }} />
          <TextField label="Instructor" value={course.instructor} InputProps={{ readOnly: true }} />
          <TextField label="Difficulty Level" value={course.difficultyLevel} InputProps={{ readOnly: true }} />

          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="outlined" onClick={() => navigate("/admin")}>Back</Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
