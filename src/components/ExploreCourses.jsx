import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Button,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardMedia
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchCourses = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const res = await axios.get("http://localhost:8088/api/courses/view");
      console.log("Fetched courses:", res.data);
      setCourses(res.data);
      setFilteredCourses(res.data);
      setShowFilters(true);

      const topics = [...new Set(res.data.map((c) => c.topic))];
      setTopicSuggestions(topics.filter(Boolean));

      if (!res.data.length) setNoResults(true);
    } catch (err) {
      console.error(err);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8088/api/enrollments/users/${userId}/enrollments`);
      setEnrolledCourseIds(res.data.map((e) => e.courseId));
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!userId) return;
    try {
      await axios.post(`http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`);
      setEnrolledCourseIds((prev) => [...prev, courseId]);

      setSelectedCourseId(courseId);
      setDialogOpen(true);
    } catch (err) {
      console.error("Error enrolling:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Enrollment failed. Please try again.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          (c.title?.toLowerCase().includes(term) || false) ||
          (c.topic?.toLowerCase().includes(term) || false)
      );
    }

    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((c) =>
        selectedDifficulty.includes(c.difficultyLevel)
      );
    }

    setFilteredCourses(filtered);
    setNoResults(filtered.length === 0);
  }, [searchTerm, selectedDifficulty, courses]);

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const handleSearchChange = (event, value) => setSearchTerm(value);

  const handleDifficultyChange = (level) => {
    setSelectedDifficulty((prev) =>
      prev.includes(level) ? prev.filter((v) => v !== level) : [...prev, level]
    );
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: "#F0F4FF", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          Explore Courses
        </Typography>
       
      </Box>

      <Autocomplete
        freeSolo
        options={topicSuggestions}
        inputValue={searchTerm}
        onInputChange={handleSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by topic or title..."
            variant="outlined"
            sx={{ width: "100%", mb: 3, borderRadius: 2 }}
          />
        )}
      />

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: 3 }}>
        {showFilters && (
          <Paper sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>
              Difficulty
            </Typography>
            <FormGroup>
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      checked={selectedDifficulty.includes(level)}
                      onChange={() => handleDifficultyChange(level)}
                    />
                  }
                  label={level}
                />
              ))}
            </FormGroup>
          </Paper>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, flex: 1 }}>
          {loading ? (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : noResults ? (
            <Alert severity="info" sx={{ width: "100%" }}>
              No courses found for “{searchTerm}”.
            </Alert>
          ) : (
            filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.courseId);
              return (
                <Card
                  key={course.courseId}
                  sx={{
                    width: 300,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                    position: "relative",
                  }}
                  onDoubleClick={() => navigate(`/course/${course.courseId}`)}
                >
                   <CardMedia
                    component="img"
                    height="160"
                    image={course.imageUrl != null ? course.imageUrl : "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"}
                    alt="Course Image"
                  />
                  <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A", mb: 1 }}>
                      {course.topic}
                    </Typography>

                    {course.instructor ? (
                      <Typography sx={{ mb: 1, color: "#555" }}>
                        {course.instructor}
                      </Typography>
                    ) : null}

                    {course.difficultyLevel ? (
                      <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                        {course.difficultyLevel}
                      </Typography>
                    ) : null}

                    <Typography sx={{ fontWeight: "bold", mb: 2, color: "#1E3A8A" }}>
                      {course.courseType && course.courseType.toLowerCase() === "paid" && course.price
                        ? `₹${course.price}`
                        : "Free"}
                    </Typography>

                    <Button
                      fullWidth
                      variant={enrolledCourseIds.includes(course.courseId) ? "contained" : "outlined"}
                      color={enrolledCourseIds.includes(course.courseId) ? "success" : "primary"}
                      disabled={enrolledCourseIds.includes(course.courseId)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.courseId);
                      }}
                    >
                      {enrolledCourseIds.includes(course.courseId) ? "Enrolled" : "Enroll"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          🎉 Enrollment Successful!
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            You’ve successfully enrolled in this course. Would you like to start learning now or explore more courses?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDialogOpen(false);
              navigate(`/course/${selectedCourseId}`);
            }}
          >
            Start Learning Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setDialogOpen(false)}
          >
            Explore More
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExploreCourses;
