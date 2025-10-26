import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import axios from "axios";
import LessonList from "./LessonList";
import AddLesson from "./AddLesson";
import LessonPage from "./LessonPage";

export default function CourseDetail() {
  const [course] = useState({ courseId: 1, title: "React Course", description: "Learn React step by step." });
  const [lessons, setLessons] = useState([]);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  
  useEffect(() => {
    axios.get(`http://localhost:9090/api/courses/${course.courseId}/lessons`)
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to fetch lessons:", err));
  }, []);

  const handleAddLesson = (newLesson) => {
    setLessons([...lessons, newLesson]);
    setShowAddLesson(false);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBackToCourse = () => {
    setSelectedLesson(null);
  };
  const handleDeleteLesson=(lessonId)=>{
    const confirm=window.confirm("Are you sure you want to delete this Lesson?");
    if(!confirm)return;
    axios.delete(`http://localhost:9090/api/courses/lessons/${lessonId}`)

    .then(()=>
    {
      setLessons((pre) => pre.filter((lesson) => lesson.lessonId !== lessonId));


    })
    .catch((err)=>console.log("failed"))
  };

  

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 3 }}>
      {!selectedLesson ? (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3">{course.title}</Typography>
            <Typography variant="body1">{course.description}</Typography>
          </Box>

          <Button variant="contained" sx={{ mb: 3 }} onClick={() => setShowAddLesson(true)}>
            + Add Lesson
          </Button>

          <LessonList lessons={lessons} onSelectLesson={handleSelectLesson} onDeleteLesson={handleDeleteLesson} />

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
              <AddLesson onLessonAdded={handleAddLesson} onClose={() => setShowAddLesson(false)} />
            </Box>
          </Modal>
        </>
      ) : (
        <LessonPage lesson={selectedLesson} onBack={handleBackToCourse} />
      )}
    </Box>
  );
}
