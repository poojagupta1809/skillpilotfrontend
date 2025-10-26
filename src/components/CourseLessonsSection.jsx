import React, { useState, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LessonList from "./LessonList";
import AddLesson from "./AddLesson";

export default function CourseLessonsSection({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const navigate = useNavigate();
  const userRole = "ADMIN";

  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/courses/${courseId}/lessons`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error("Failed to fetch lessons:", err));
  }, [courseId]);

  const handleAddLesson = (newLesson) => {
    setLessons((prev) => [...prev, newLesson]);
    setShowAddLesson(false);
  };

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
          <Button variant="contained" onClick={() => setShowAddLesson(true)}>
            + Add Lesson
          </Button>
        </Box>
      )}

      {userRole === "ADMIN" && (
        <Modal open={showAddLesson} onClose={() => setShowAddLesson(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
            }}
          >
            <AddLesson
              courseId={courseId}
              onLessonAdded={handleAddLesson}
              onClose={() => setShowAddLesson(false)}
            />
          </Box>
        </Modal>
      )}

      <LessonList
        lessons={lessons}
        onDeleteLesson={userRole === "ADMIN" ? handleDeleteLesson : null}
      />
    </Box>
  );
}

