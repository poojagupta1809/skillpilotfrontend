import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function LessonPage({ lesson, onBack }) {
  
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>Back to Course</Button>

      <Typography variant="h4" gutterBottom>{lesson.title}</Typography>
      <Typography variant="body1" gutterBottom>{lesson.description}</Typography>
      <Typography variant="body2" gutterBottom>Type: {lesson.contentType}</Typography>

      {lesson.contentType === "TEXT" && <Typography>{lesson.content}</Typography>}

      {lesson.contentType === "VIDEO" && lesson.videoUrl && (
        <iframe width="100%" height="400" src={getYouTubeEmbedUrl(lesson.videoUrl)} title={lesson.title} frameBorder="0" allowFullScreen />
      )}

      {lesson.contentType === "QUIZ" && (
        <Box sx={{ mt: 2, p: 2, border: "1px dashed #888", borderRadius: 1 }}>
          <Typography variant="subtitle1">Quiz Data:</Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{lesson.content}</Typography>
        </Box>
      )}
    </Box>
  );
}
