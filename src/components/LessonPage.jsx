import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";

export default function LessonPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const lessons = location.state?.lessons || [];
  const lesson = location.state?.lesson;
 // const courseId = location.state?.courseId;
const { courseId, lessonId } = useParams();

  if (!lesson) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          ⚠️ Lesson data not available.
        </Typography>
        <Button
          variant="contained"
        
       onClick={() => navigate(`/course/${location.state?.courseId || ""}`)}
  sx={{ mb: 3, fontSize: "1rem", px: 3, py: 1, borderRadius: 2 }}
        >
          Course
        </Button>
      </Box>
    );
  }

 
  const currentIndex = lessons.findIndex(l => l.lessonId === lesson.lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
    );
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 6, px: 2 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 1000,
          width: "100%",
          borderRadius: 4,
          bgcolor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh", 
        }} >
        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Button
  variant="outlined"
  onClick={() => navigate(`/course/${courseId || ""}`)}
  sx={{ mb: 3, fontSize: "1rem", px: 3, py: 1, borderRadius: 2 }}
>
  ← Back to Course
</Button>

          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {lesson.title}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {lesson.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {lesson.contentType === "TEXT" && (
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", fontSize: "1.2rem", lineHeight: 1.8 }}
            >
              {lesson.content}
            </Typography>
          )}

          {lesson.contentType === "VIDEO" && lesson.videoUrl && (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <iframe
                width="90%"
                height="500"
                src={getYouTubeEmbedUrl(lesson.videoUrl)}
                title={lesson.title}
                frameBorder="0"
                style={{ borderRadius: "12px" }}
                allowFullScreen
              />
            </Box>
          )}

          {lesson.contentType === "QUIZ" && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                border: "2px dashed #1976d2",
                borderRadius: 3,
                bgcolor: "#e3f2fd",
              }}
            >
              <Typography variant="h5" gutterBottom>
                📝 Quiz
              </Typography>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}
              >
                {lesson.content}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          {prevLesson ? (
            <Button
              variant="outlined"
              color="primary"
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              onClick={() =>
            
navigate(`/course/${courseId}/lesson/${prevLesson.lessonId}`, { state: { lesson: prevLesson, lessons } })

              }
            >
              ← Previous 
            </Button>
          ) : <Box />}

          {nextLesson ? (
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              onClick={() =>
navigate(`/course/${courseId}/lesson/${nextLesson.lessonId}`, { state: { lesson: nextLesson, lessons } })
              }
            >
              Next →
            </Button>
          ) : <Box />}
        </Box>
      </Paper>
    </Box>
  );
}
