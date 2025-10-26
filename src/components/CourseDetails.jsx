import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function CourseDetails() {
  const { id } = useParams(); 
  console.log("id from useParams():", id); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        console.error("Error fetching course details:", err);
      })
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
        <CardContent>
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

          {course.lessonList && course.lessonList.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Lessons:
              </Typography>
              <List>
                {course.lessonList.map((lesson, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. ${lesson.title}`}
                      secondary={lesson.content}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
