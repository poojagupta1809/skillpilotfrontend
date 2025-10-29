import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateLesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    contentType: "",
    content: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Set Authorization header
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  // Fetch lesson data
  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/courses/lesson/${lessonId}`)
      .then((res) => {
           const data = res.data;

     
      const safeVideoUrl =
        typeof data.videoUrl === "string" &&
        data.videoUrl.trim().length > 0 &&
        data.videoUrl !== "null" &&
        data.videoUrl !== "undefined"
          ? data.videoUrl.trim()
          : "";
        setLessonData({
          title: res.data.title || "",
          description: res.data.description || "",
          contentType: res.data.contentType || "",
          content: res.data.content || "",
          videoUrl: res.data.videoUrl || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch lesson:", err);
        setErrors(["Failed to load lesson data."]);
        setLoading(false);
      });
  }, [lessonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    axios
      .put(`http://localhost:8088/api/courses/lessons/${lessonId}`, lessonData)
      .then((res) => {
        setSuccessMessage("✅ Lesson updated successfully!");
        navigate(`/course/${courseId}`); 
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data) {
          const backendErrors = [];
          const data = err.response.data;
          for (const key in data) {
            backendErrors.push(`${key}: ${data[key]}`);
          }
          setErrors(backendErrors);
        } else {
          setErrors(["Server error. Please try again later."]);
        }
      });
  };

  if (loading) return <Typography>Loading lesson...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, bgcolor: "#fff", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Lesson
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Lesson Title"
          name="title"
          value={lessonData.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={lessonData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Content Type"
          name="contentType"
          value={lessonData.contentType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="TEXT">Text</MenuItem>
          <MenuItem value="VIDEO">Video</MenuItem>
        </TextField>

        {lessonData.contentType === "TEXT" && (
          <TextField
            fullWidth
            multiline
            rows={15}
            label="Text Content"
            name="content"
            value={lessonData.content}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        )}

        {lessonData.contentType === "VIDEO" && (
          <TextField
            fullWidth
            label="YouTube Video URL"
            name="videoUrl"
            value={lessonData.videoUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            Update Lesson
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate(`/courses/${courseId}`)}>
            Cancel
          </Button>
        </Box>
      </form>

      <Snackbar
        open={errors.length > 0}
        autoHideDuration={6000}
        onClose={() => setErrors([])}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErrors([])}>
          <ul>
            {errors.map((errMsg, idx) => (
              <li key={idx}>{errMsg}</li>
            ))}
          </ul>
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
