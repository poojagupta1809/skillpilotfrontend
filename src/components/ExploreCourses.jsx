import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses/view")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Available Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.courseId}>
            <Card
              onClick={() => {
          console.log("Navigating to courseId:", course.courseId); 
          navigate(`/course/${course.courseId}`);
        }}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                transition: "all 0.3s ease",
              }}
            >
              {course.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={course.image}
                  alt={course.topic} 
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {course.topic} 
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {course.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, color: "#5728D6" }}
                >
                  Difficulty: {course.difficultyLevel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
