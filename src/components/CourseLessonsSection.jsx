import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import LessonList from "./LessonList";

export default function CourseLessonsSection({ courseId: props, isEnrolled: propIsEnrolled}) {
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const { courseId: paramcourseId } = useParams();
  const courseId = props || paramcourseId;
  const [isEnrolled, setIsEnrolled] = useState(propIsEnrolled || false);
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
   
    axios
      .get(`http://localhost:8088/api/courses/${courseId}/lessons`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error("Failed to fetch lessons:", err));

    
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:8088/api/enrollments/users/${userId}/enrollments`)
        .then((res) => {
          const enrolled = res.data.some((e) => e.courseId === Number(courseId));
          setIsEnrolled(enrolled);
        })
        .catch(() => setIsEnrolled(false));
    }
  }, [courseId]);
useEffect(() => {
    setIsEnrolled(propIsEnrolled);
  }, [propIsEnrolled]);

 
  const visibleLessons =
    !isEnrolled && sessionStorage.getItem("role") !== "ADMIN"
      ? lessons.slice(0, 2)
      : lessons;
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLessons = visibleLessons.slice(startIndex, endIndex);

  const handleDeleteLesson = (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    axios
      .delete(`http://localhost:8088/api/courses/lessons/${lessonId}`)
      .then(() => setLessons((prev) => prev.filter((l) => l.lessonId !== lessonId)))
      .catch(() => console.error("Failed to delete lesson"));
  };

  const handleEditLesson = (lessonId) => {
    navigate(`/course/${courseId}/lesson/${lessonId}/edit`);
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
      }}
    >
     
      {userRole === "ADMIN" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/course/${courseId}/add-lesson`)}
          >
            + Add Lesson
          </Button>
        </Box>
      )}

     
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          height: { xs: `${itemsPerPage * 140}px`, sm: `${itemsPerPage * 125}px` },
          flexDirection: "column",
          justifyContent: "flex-start",
          overflowY: "hidden",
          mb: 4,
        }}
      >
        {/* Lesson List */}
        <LessonList
          courseId={courseId}
          Alllessons={lessons}
          lessons={paginatedLessons}
          visible={visibleLessons}
          onDeleteLesson={userRole === "ADMIN" ? handleDeleteLesson : null}
          onEditLesson={userRole === "ADMIN" ? handleEditLesson : null}
        />

       
        {!isEnrolled && userRole !== "ADMIN" && lessons.length > 2 && (
          <Box
            sx={{
              mt: 3,
              p: 3,
              bgcolor: "#fff3cd",
              color: "#856404",
              borderRadius: 2,
              textAlign: "center",
              border: "1px solid #ffeeba",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                fontFamily: "Poppins",
              }}
            >
              🔒 Enroll in this course to access all lessons!
            </Typography>
            
          </Box>
        )}

        {paginatedLessons.length < itemsPerPage &&
          Array.from({ length: itemsPerPage - paginatedLessons.length }).map(
            (_, i) => <Box key={i} sx={{ flex: "0 0 90px" }} />
          )}
      </Box>

    
      <Stack spacing={2} alignItems="center" sx={{ mt: 0, pb: 2 }}>
        <Pagination
          count={Math.ceil(visibleLessons.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Box>
  );
}
