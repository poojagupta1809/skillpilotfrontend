import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CoursePurchase = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [sliderValue, setSliderValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    axios
      .get(`http://localhost:8088/api/courses/${id}`, { headers })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePaymentInputChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSlide = async (event, newValue) => {
    setSliderValue(newValue);
    if (newValue === 100) {
      try {
        await axios.post(
          `http://localhost:8088/api/enrollments/courses/${id}/enrollments/${userId}`,
          {},
          { headers }
        );
        setTimeout(() => setDialogOpen(true), 500);
      } catch (err) {
        console.error("Enrollment after payment failed:", err);
        alert("Enrollment failed after payment!");
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (!course)
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Course not found.
      </Typography>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "flex-start", // pull to top
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        pt: 6, // top padding
        pb: 6,
      }}
    >
      <Card
        sx={{
          flex: "0 0 360px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          p: 2,
          backgroundColor: "#ffffff",
          margin: "0 auto",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Billing Summary
          </Typography>

          {/* Billing Info */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Course
            </Typography>
            <Typography variant="body2">{course.topic}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Instructor
            </Typography>
            <Typography variant="body2">{course.instructor}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Payment Method */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Choose Payment Method
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="card" control={<Radio />} label="Card" />
            <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
          </RadioGroup>

          <Box sx={{ mt: 2, mb: 2 }}>
            {paymentMethod === "upi" && (
              <TextField
                fullWidth
                label="Enter UPI ID"
                placeholder="example@upi"
                variant="outlined"
                size="small"
                value={paymentDetails.upi || ""}
                onChange={(e) =>
                  handlePaymentInputChange("upi", e.target.value)
                }
              />
            )}

            {paymentMethod === "card" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField
                  label="Card Number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  variant="outlined"
                  size="small"
                  value={paymentDetails.cardNumber || ""}
                  onChange={(e) =>
                    handlePaymentInputChange("cardNumber", e.target.value)
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="Expiry (MM/YY)"
                    placeholder="MM/YY"
                    variant="outlined"
                    size="small"
                    value={paymentDetails.expiry || ""}
                    onChange={(e) =>
                      handlePaymentInputChange("expiry", e.target.value)
                    }
                  />
                  <TextField
                    label="CVV"
                    placeholder="***"
                    variant="outlined"
                    size="small"
                    type="password"
                    value={paymentDetails.cvv || ""}
                    onChange={(e) =>
                      handlePaymentInputChange("cvv", e.target.value)
                    }
                  />
                </Box>
                <TextField
                  label="Name on Card"
                  placeholder="Full Name"
                  variant="outlined"
                  size="small"
                  value={paymentDetails.cardName || ""}
                  onChange={(e) =>
                    handlePaymentInputChange("cardName", e.target.value)
                  }
                />
              </Box>
            )}

            {paymentMethod === "wallet" && (
              <TextField
                fullWidth
                label="Wallet ID / Phone Number"
                placeholder="Enter wallet ID or mobile number"
                variant="outlined"
                size="small"
                value={paymentDetails.wallet || ""}
                onChange={(e) =>
                  handlePaymentInputChange("wallet", e.target.value)
                }
              />
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Total Payable
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#2e7d32" }}
            >
              ₹{course.price}
            </Typography>
          </Box>

          {/* Slide to Pay */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, textAlign: "center" }}
            >
              Slide to Pay
            </Typography>
            <Slider
              value={sliderValue}
              onChange={handleSlide}
              step={1}
              marks={[
                { value: 0, label: "" },
                { value: 100, label: "" },
              ]}
              sx={{
                color: "#1976d2",
                height: 10,
                "& .MuiSlider-thumb": {
                  width: 28,
                  height: 28,
                  backgroundColor: "#fff",
                  border: "2px solid #1976d2",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Success Dialog */}
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
            You’ve successfully enrolled in this course. Would you like to start
            learning now or explore more courses?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDialogOpen(false);
              navigate(`/course/${course.courseId}`);
            }}
          >
            Start Learning Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setDialogOpen(false);
              navigate("/courses");
            }}
          >
            Explore More
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursePurchase;
