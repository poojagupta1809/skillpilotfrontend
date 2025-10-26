import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";

export default function AddLesson({ courseId, onLessonAdded, onClose }) {
  let authorization = 'Bearer ' + sessionStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = authorization;
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    contentType: "",
    content: "",
    videoUrl: "",
  });
  const [message, setMessage] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:8088/api/courses/${courseId}/lessons`, lessonData)
      .then((res) => {
        setMessage("✅ Lesson added successfully!");
        setLessonData({
          title: "",
          description: "",
          contentType: "",
          content: "",
          videoUrl: "",
        });
        if (onLessonAdded) onLessonAdded(res.data); 
        if (onClose) onClose(); 
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to add lesson.");
      });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, bgcolor: "#fff", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>➕ Add New Lesson</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Lesson Title"
          name="title"
          value={lessonData.title}
          onChange={handleChange}
          required
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
          required
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Content Type"
          name="contentType"
          value={lessonData.contentType}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="TEXT">Text</MenuItem>
          <MenuItem value="VIDEO">Video</MenuItem>
          <MenuItem value="QUIZ">Quiz</MenuItem>
        </TextField>

        {lessonData.contentType === "TEXT" && (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Text Content"
            name="content"
            value={lessonData.content}
            onChange={handleChange}
            required
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
            required
            sx={{ mb: 2 }}
          />
        )}

        {lessonData.contentType === "QUIZ" && (
          <TextField
            fullWidth
            label="Quiz Content"
            name="content"
            value={lessonData.content}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Button variant="contained" color="primary" type="submit">Add Lesson</Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>Close</Button>
        </Box>
      </form>

      {message && <Typography sx={{ mt: 2, textAlign: "center" }}>{message}</Typography>}
    </Box>
  );
}
