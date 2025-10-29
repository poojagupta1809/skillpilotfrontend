import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    contentType: "",
    content: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    axios
      .post(`http://localhost:8088/api/courses/${courseId}/lessons`, lessonData)
      .then(() => {
        setSuccessMessage("✅ Lesson added successfully!");
        setLessonData({
          title: "",
          description: "",
          contentType: "",
          content: "",
          videoUrl: "",
        });
        navigate(`/admin/course-details/${courseId}`);
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

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 5,
        width: { xs: "90%", sm: "700px", md: "900px" }, 
        mx: "auto",
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          p: 5,
          borderRadius: 3,
          boxShadow: 4,
          display: "flex",
          flexDirection: "column",
          minHeight: "650px",
        }}
      >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "primary.main", fontWeight: 400 }}>
          Create New Lesson
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Lesson Title"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            select
            fullWidth
            label="Content Type"
            name="contentType"
            value={lessonData.contentType}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          >
            <MenuItem value="TEXT">Text</MenuItem>
            <MenuItem value="VIDEO">Video</MenuItem>
          </TextField>

          {lessonData.contentType === "TEXT" && (
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Text Content"
              name="content"
              value={lessonData.content}
              onChange={handleChange}
              sx={{ mb: 8 }}
              required
            />
          )}

          {lessonData.contentType === "VIDEO" && (
            <TextField
              fullWidth
              label="YouTube Video URL"
              name="videoUrl"
              value={lessonData.videoUrl}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button variant="contained" color="primary" type="submit">
              Add Lesson
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/admin/course-details/${courseId}`)}
            >
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
          <Alert severity="error" onClose={() => setErrors([])} sx={{ whiteSpace: "normal" }}>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
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
    </Container>
  );
}
