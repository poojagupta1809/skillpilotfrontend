import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const CoursePurchase = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Typography variant="h6" color="error" align="center" mt={5}>
        Course not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: 4, px: { xs: 2, md: 8 } }}>
      <Grid container spacing={4}>
        {/* LEFT SIDE - COURSE DETAILS */}
        <Grid item xs={12} md={8.5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
              <img
                src={
                  course.imageUrl ||
                  "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
                }
                alt={course.title}
                style={{
                  width: "260px",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <Box flex={1}>
                <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Created by: {course.instructor || "Instructor Name"}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {course.description || "No description available."}
                </Typography>

                <Box mt={3} display="flex" gap={4}>
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      ⭐ {course.rating || "4.8"} / 5.0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.studentsEnrolled || 1200} students
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      Duration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.duration || "8 weeks"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" color="text.primary">
                Course Price
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="primary">
                ₹{course.price}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT SIDE - PAYMENT SUMMARY */}
        <Grid item xs={12} md={3.5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Billing Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Course Price</Typography>
              <Typography>₹{course.price}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Select Payment Method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="debitCard" control={<Radio />} label="Debit Card" />
              <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="netBanking" control={<Radio />} label="Net Banking" />
              <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
              <FormControlLabel value="paytm" control={<Radio />} label="PayTM" />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
              }}
              onClick={() => alert(`Proceeding to pay ₹${course.price}`)}
            >
              Pay ₹{course.price}
            </Button>

            <Typography
              variant="caption"
              display="block"
              align="center"
              color="text.secondary"
              mt={1.5}
            >
              🔒 Secure Checkout
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoursePurchase;
