import React, { useState, useEffect } from "react";
import LessonList from "./LessonList";
import AddLesson from "./AddLesson";
import UpdateLesson from "./UpdateLesson";
import LessonPage from "./LessonPage";
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";

export default function CourseLessonsSection({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
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
    if (!window.confirm("Are you sure you want to delete this Lesson?")) return;

    axios
      .delete(`http://localhost:8088/api/courses/lessons/${lessonId}`)
      .then(() => setLessons((prev) => prev.filter((l) => l.lessonId !== lessonId)))
      .catch(() => console.error("Failed to delete lesson"));
  };

  const handleUpdateLesson = (updatedLesson) => {
    setLessons((prev) =>
      prev.map((l) => (l.lessonId === updatedLesson.lessonId ? updatedLesson : l))
    );
    setEditingLesson(null);
  };

  if (selectedLesson) {
    return <LessonPage lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

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
        <>
          {/* Add Lesson using Dialog */}
          <Dialog
            open={showAddLesson}
            onClose={() => setShowAddLesson(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>➕ Add New Lesson</DialogTitle>
            <DialogContent>
              <AddLesson
                courseId={courseId}
                onLessonAdded={handleAddLesson}
                onClose={() => setShowAddLesson(false)}
              />
            </DialogContent>
          </Dialog>

          <LessonList
            lessons={lessons}
            onSelectLesson={setSelectedLesson}
            onDeleteLesson={userRole === "ADMIN" ? handleDeleteLesson : null}
            onEditLesson={userRole === "ADMIN" ? setEditingLesson : null}
          />

          {/* Edit Lesson */}
          {editingLesson && (
            <Dialog
              open={true}
              onClose={() => setEditingLesson(null)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>✏️ Edit Lesson</DialogTitle>
              <DialogContent>
                <UpdateLesson
                  lesson={editingLesson}
                  onLessonUpdated={handleUpdateLesson}
                  onClose={() => setEditingLesson(null)}
                />
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </Box>
  );
}
