import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LessonList from "./LessonList";

export default function CourseLessonsSection({ courseId }) {
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/courses/${courseId}/lessons`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error("Failed to fetch lessons:", err));
  }, [courseId]);

  const handleDeleteLesson = (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    axios
      .delete(`http://localhost:8088/api/courses/lessons/${lessonId}`)
      .then(() => setLessons((prev) => prev.filter((l) => l.lessonId !== lessonId)))
      .catch(() => console.error("Failed to delete lesson"));
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 3 }}>
      {userRole === "ADMIN" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/courses/${courseId}/add-lesson`)}
          >
            + Add Lesson
          </Button>
        </Box>
      )}

      <LessonList
        lessons={lessons}
        onDeleteLesson={userRole === "ADMIN" ? handleDeleteLesson : null}
      />
    </Box>
  );
}
