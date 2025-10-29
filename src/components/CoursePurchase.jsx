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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CoursePurchase = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

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

  const handlePayment = async () => {
    setProcessing(true);
    try {
      await axios.post(
        `http://localhost:8088/api/enrollments/courses/${id}/enrollments/${userId}`,
        {},
        { headers }
      );
      setTimeout(() => {
        setProcessing(false);
        setDialogOpen(true);
      }, 800);
    } catch (err) {
      console.error("Enrollment after payment failed:", err);
      setProcessing(false);
      alert("Enrollment failed after payment!");
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
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        pt: 8,
        pb: 8,
      }}
    >
      {/* Go Back Button */}
      <Box sx={{ width: "100%", maxWidth: 620, mb: 2, px: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            textTransform: "none",
            color: "#1E3A8A",
            fontWeight: 600,
            fontSize: "0.95rem",
            mb: 1,
          }}
        >
          Go Back
        </Button>
      </Box>

      {/* Main Card */}
      <Card
        sx={{
          width: "90%",
          maxWidth: 620,
          borderRadius: "20px",
          boxShadow: "0 10px 32px rgba(0,0,0,0.15)",
          p: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              color: "#1E3A8A",
            }}
          >
            Billing Summary
          </Typography>

          {/* Billing Info */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
            <Typography color="text.secondary">Course</Typography>
            <Typography>{course.topic}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
            <Typography color="text.secondary">Instructor</Typography>
            <Typography>{course.instructor}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

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

          <Box sx={{ mt: 3, mb: 3 }}>
            {paymentMethod === "upi" && (
              <TextField
                fullWidth
                label="Enter UPI ID"
                placeholder="example@upi"
                variant="outlined"
                size="medium"
                value={paymentDetails.upi || ""}
                onChange={(e) =>
                  handlePaymentInputChange("upi", e.target.value)
                }
              />
            )}

            {paymentMethod === "card" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Card Number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  variant="outlined"
                  size="medium"
                  value={paymentDetails.cardNumber || ""}
                  onChange={(e) =>
                    handlePaymentInputChange("cardNumber", e.target.value)
                  }
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Expiry (MM/YY)"
                    placeholder="MM/YY"
                    variant="outlined"
                    size="medium"
                    value={paymentDetails.expiry || ""}
                    onChange={(e) =>
                      handlePaymentInputChange("expiry", e.target.value)
                    }
                  />
                  <TextField
                    label="CVV"
                    placeholder="***"
                    variant="outlined"
                    size="medium"
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
                  size="medium"
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
                size="medium"
                value={paymentDetails.wallet || ""}
                onChange={(e) =>
                  handlePaymentInputChange("wallet", e.target.value)
                }
              />
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Total Payable
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#2e7d32" }}
            >
              ₹{course.price}
            </Typography>
          </Box>

          {/* Pay Button */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                borderRadius: "10px",
                py: 1.6,
                fontWeight: 700,
                fontSize: "1.05rem",
                textTransform: "none",
                backgroundColor: "#1E3A8A",
                ":hover": { backgroundColor: "#1A237E" },
              }}
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing..." : "Complete Payment"}
            </Button>
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
