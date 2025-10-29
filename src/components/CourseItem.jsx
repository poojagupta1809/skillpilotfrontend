import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Stack, Card, CardContent, Typography } from "@mui/material";
import CourseLessonsSection from "./CourseLessonsSection";
import './LearnerCourseCard.css'

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
    const handleCancel = () => {
        navigate('/admin');
    };

    return (
        <>
             
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f9fafb",
                    p: 3,
                }}
            >
                <Card
                    sx={{
                        maxWidth: 800,
                        width: "100%",
                        borderRadius: 4,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff",
                        p: 3,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 1, color: "#1E3A8A" }}
                        >
                            {course.topic}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Instructor: <strong>{course.instructor}</strong>
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {course.description}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 3 }}>
                            Difficulty Level: <strong>{course.difficultyLevel}</strong>
                        </Typography>

                    </CardContent>

                    <Box sx={{ height: "1px", backgroundColor: "#ddd", my: 2 }} />

                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Course Lessons
                        </Typography>
                        <CourseLessonsSection courseId={course.courseId} />
                    </CardContent>
                    <Button type="text" variant="outlined" onClick={handleCancel}>
                        Back
                    </Button>

                </Card>

            </Box>
        </>
    );
}
