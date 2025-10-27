import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Box, TextField, Autocomplete, FormGroup, FormControlLabel, Checkbox, Paper, Divider, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./ExploreCourses.css";

const ExploreCourses = () => {
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchAllCourses = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get("http://localhost:8088/api/courses/view");
      setCourses(response.data);
      if (!response.data.length) setNoResults(true);

      const topics = [...new Set(response.data.map((course) => course.topic))];
      setTopicSuggestions(topics.filter(Boolean));
    } catch (error) {
      console.error("Error fetching all courses:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredCourses = async (params) => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get("http://localhost:8088/api/courses/filter", { params });
      setCourses(response.data);
      if (!response.data.length) setNoResults(true);
    } catch (error) {
      console.error("Error fetching filtered courses:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event, value) => setSearchTerm(value);

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/courses?search=${encodeURIComponent(query)}`, { replace: false });
  };

  const handleFilterChange = (value) => {
    setSelectedDifficulty((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      setSearchTerm(query);
      setShowFilters(true);
      fetchFilteredCourses({ topic: query });
    } else {
      setShowFilters(false);
      setSelectedDifficulty([]);
      fetchAllCourses();
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topic = params.get("search");

    if (showFilters && topic) {
      fetchFilteredCourses({
        topic,
        difficultyLevel: selectedDifficulty.join(",") || undefined,
      });
    }
  }, [selectedDifficulty]);

  return (
    <Box className="explore-container">
      <Box className="header-container">
        <Typography variant="h4" className="page-title">
          Explore Courses
        </Typography>
        <Typography
          variant="subtitle1"
          className="my-courses-link"
          onClick={() => navigate("/myenrollmentss")}
          sx={{ cursor: "pointer" }}
        >
          My Courses
        </Typography>
      </Box>

      <Autocomplete
        freeSolo
        options={topicSuggestions}
        inputValue={searchTerm}
        onInputChange={handleSearchInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by topic..."
            variant="outlined"
            className="search-bar"
          />
        )}
      />

      <Divider className="divider" />

      <Box className="main-content">
        {showFilters && (
          <Paper className="filters-panel">
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
                      onChange={() => handleFilterChange(level)}
                    />
                  }
                  label={level}
                />
              ))}
            </FormGroup>
          </Paper>
        )}

        {loading ? (
          <Box className="loading-container">
            <CircularProgress />
          </Box>
        ) : noResults ? (
          <Alert severity="info" sx={{ mt: 3 }}>
            No courses found for “{searchTerm}”. Try another topic.
          </Alert>
        ) : (
          <Box className="courses-container">
            {courses.map((course) => (
              <Card
                key={course.courseId}
                className="course-card"
                onClick={() => navigate(`/course/${course.courseId}`)}
              >
                <CardContent className="card-content">
                  <Typography className="course-title">{course.title}</Typography>
                  <Typography className="course-description">{course.description}</Typography>
                  <Typography className="instructor-text">
                    Instructor: {course.instructorName || course.instructor || "Unknown"}
                  </Typography>
                  <Typography className="difficulty-text">{course.difficultyLevel}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExploreCourses;
