import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { Pagination, Stack } from "@mui/material";

import LessonList from "./LessonList";

export default function CourseLessonsSection({courseId:props}) {
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;
  const {courseId:paramcourseId} = useParams();
const courseId  = props|| paramcourseId;
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedLessons = lessons.slice(startIndex, endIndex);

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
  <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>

  {/* Admin Add Lesson Button */}
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

  
  {/* Lesson List Container */}

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
  <LessonList courseId={courseId}
    Alllessons={lessons} 
  lessons={paginatedLessons} 
    onDeleteLesson={userRole === "ADMIN" ? handleDeleteLesson : null}
  />

 
  {paginatedLessons.length < itemsPerPage &&
    Array.from({ length: itemsPerPage - paginatedLessons.length }).map((_, i) => (
      <Box key={i} sx={{ flex: "0 0 90px" }} />
    ))}
</Box>

{/* Pagination*/}
<Stack
  spacing={2}
  alignItems="center"
  sx={{
    mt: 0, 
    pb: 2, 
  }}
>
  <Pagination
    count={Math.ceil(lessons.length / itemsPerPage)}
    page={page}
    onChange={(e, value) => setPage(value)}
    color="primary"
  />
</Stack>


</Box>
  );
}