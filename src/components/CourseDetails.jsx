import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import axios from "axios";
import CourseLessonsSection from "./CourseLessonsSection";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`http://localhost:8088/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error fetching course details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (!course) return <Typography>Course not found.</Typography>;

  return (
<Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 900, mx: "auto", borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {course.topic}
            </Typography>
            <Typography variant="h6" sx={{ color: "gray", mb: 2 }}>
              Instructor: {course.instructor}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {course.description}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Difficulty Level: {course.difficultyLevel}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "start" }}>
            <Button variant="contained" color="primary">
              Enroll
            </Button>
          </Box>
        </CardContent>
      </Card>
    
       <CourseLessonsSection courseId={id} />
    </Box>
  );
}
