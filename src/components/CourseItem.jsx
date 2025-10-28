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

    return (
        <>
            <div className="course-details-container">
                <Card className="course-card">
                    <CardContent className="course-card-content">
                        <div className="course-main-content">
                            <Typography variant="h4" className="course-title">
                                {course.topic}
                            </Typography>

                            <Typography variant="h6" className="course-instructor">
                                Instructor: {course.instructor}
                            </Typography>

                            <Typography variant="body1" className="course-description">
                                {course.description}
                            </Typography>

                            <Typography variant="body2" className="course-difficulty">
                                Difficulty Level: {course.difficultyLevel}
                            </Typography>
                        </div>

                        <div>
                            
<CourseLessonsSection courseId={courseId} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
