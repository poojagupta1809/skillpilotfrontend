import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Alert,
  Tooltip,
  LinearProgress,
  IconButton,
  Collapse,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AdminEnrollments = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchEnrollments();
  }, [navigate]);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const enrollmentRes = await axios.get("http://localhost:8088/api/enrollments");

      const coursePromises = enrollmentRes.data.map((e) =>
        axios.get(`http://localhost:8088/api/courses/${e.courseId}`)
      );
      const courseResponses = await Promise.all(coursePromises);

      const combined = courseResponses.map((res) => ({
        ...res.data,
        enrolledUsers: enrollmentRes.data.filter(
          (e) => e.courseId === res.data.courseId
        ),
      }));

      setCourses(combined);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setErrorMsg("Failed to fetch enrollments.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEnrollment = async (courseId, userId) => {
    try {
      await axios.delete(
        `http://localhost:8088/api/enrollments/courses/${courseId}/enrollments/${userId}`
      );
      fetchEnrollments();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      setErrorMsg("Failed to remove enrollment.");
    }
  };

  const toggleRow = (courseId) => {
    setOpenRows((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1E3A8A" }}>
        Admin - Manage Enrollments
      </Typography>

      {loading && <LinearProgress />}

      {!loading && courses.length === 0 && (
        <Alert severity="info">No enrollments available.</Alert>
      )}

      {courses.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: "bold" }}>Course Topic</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Instructor</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Enrolled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <React.Fragment key={course.courseId}>
                  {/* Course row */}
                  <TableRow sx={{ bgcolor: "#E8F0FE" }}>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(course.courseId)}
                      >
                        {openRows[course.courseId] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{course.topic}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.instructor || "Unknown"}</TableCell>
                    <TableCell>{course.enrolledUsers.length}</TableCell>
                  </TableRow>

                  {/* Collapsible row for users */}
                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, borderBottom: 0 }}>
                      <Collapse
                        in={openRows[course.courseId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table size="small" sx={{ m: 2 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ pl: 4, fontWeight: "bold" }}>User ID</TableCell>
                              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {course.enrolledUsers.map((user) => (
                              <TableRow key={user.enrollmentId}>
                                <TableCell sx={{ pl: 4 }}>{user.userName}</TableCell>
                                <TableCell>
                                  <Tooltip title="Remove Enrollment">
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() =>
                                        handleDeleteEnrollment(course.courseId, user.userId)
                                      }
                                      sx={{ minWidth: "36px", p: 0, borderRadius: "50%" }}
                                    >
                                      <DeleteOutlineRoundedIcon fontSize="small" />
                                    </Button>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {errorMsg && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};

export default AdminEnrollments;
