import React from 'react'
import { Box, TextField, Stack, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function CourseEdit() {
    let authorization = 'Bearer ' + sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = authorization;
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
                navigate("/admin")
            })
            .catch((err) => {
                console.log("Error occurred", err);
                alert("Not able to update course");
            });
    };


    const handleCancel = () => {
        setIsEditing(false);
        setEditedCourse(course);
        navigate("/admin")
    };
    return (
        <Box sx={{
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
        }}>

            <TextField name="topic" label="Course Title" value={editedCourse.topic} onChange={handleChange} required />
            <TextField name="description" label="Description" value={editedCourse.description} onChange={handleChange} multiline rows={4} />
            <TextField name="instructor" label="Instructor" value={editedCourse.instructor} onChange={handleChange} required />
            <TextField name="difficultyLevel" label="Difficulty Level" value={editedCourse.difficultyLevel} onChange={handleChange} required />
            <TextField
                fullWidth
                name="imageUrl"
                label="Image Url"
                value={editedCourse.imageUrl != null ? editedCourse.imageUrl : null}
                onChange={handleChange}
                required
            />
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: "center", }}>

                <Button type="submit" variant="contained" onClick={handleSubmit}>Save</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Box>
    )
}
