import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Stack } from "@mui/material";
import CourseLessonsSection from "./CourseLessonsSection";

export default function CourseItem() {
    let authorization = 'Bearer ' + sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = authorization;
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [showComponent, setShowComponent] = useState(false);


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

    

    const handleViewLesson = () => {
        setShowComponent(true);
    }

    return (
        <>
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
                <TextField fullWidth label="Course Title" value={course.topic} InputProps={{ readOnly: true }} />
                <TextField fullWidth label="Description" value={course.description} multiline rows={4} InputProps={{ readOnly: true }} />
                <TextField fullWidth label="Instructor" value={course.instructor} InputProps={{ readOnly: true }} />
                <TextField fullWidth label="Difficulty Level" value={course.difficultyLevel} InputProps={{ readOnly: true }} />
                <Button fullWidth variant="contained" onClick={handleViewLesson}>View Lessons here</Button>
                {showComponent && <CourseLessonsSection courseId={courseId} />}
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                    {/* <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button> */}
                    <Button variant="outlined" onClick={() => navigate("/admin")}>Back</Button>
                </Stack>
            </Box>
        </>
    );
}
