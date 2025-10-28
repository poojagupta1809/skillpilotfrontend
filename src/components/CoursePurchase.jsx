import React, { useState } from "react";
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
  Alert,
} from "@mui/material";

const CoursePurchase = ({ course }) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [sliderValue, setSliderValue] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);

  if (!course) return null;

  const handlePaymentInputChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSlide = (event, newValue) => {
    setSliderValue(newValue);
    if (newValue === 100 && !paymentComplete) {
      setTimeout(() => {
        setPaymentComplete(true);
      }, 500);
    }
  };

  return (
    <Card
      sx={{
        flex: "0 0 360px",
        borderRadius: "12px",
        boxShadow: 3,
        p: 2,
        height: "fit-content",
        backgroundColor: "#ffffff",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Billing Summary
        </Typography>

        {/* Billing Summary */}
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

        {/* Payment Options */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Choose Payment Method
        </Typography>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel
            value="wallet"
            control={<Radio />}
            label="Wallet (Paytm / PhonePe / Others)"
          />
        </RadioGroup>

        {/* Dynamic Input Fields */}
        <Box sx={{ mt: 2, mb: 2 }}>
          {paymentMethod === "upi" && (
            <TextField
              fullWidth
              label="Enter UPI ID"
              placeholder="example@upi"
              variant="outlined"
              size="small"
              value={paymentDetails.upi || ""}
              onChange={(e) => handlePaymentInputChange("upi", e.target.value)}
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
                  onChange={(e) => handlePaymentInputChange("expiry", e.target.value)}
                />
                <TextField
                  label="CVV"
                  placeholder="***"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={paymentDetails.cvv || ""}
                  onChange={(e) => handlePaymentInputChange("cvv", e.target.value)}
                />
              </Box>
              <TextField
                label="Name on Card"
                placeholder="Full Name"
                variant="outlined"
                size="small"
                value={paymentDetails.cardName || ""}
                onChange={(e) => handlePaymentInputChange("cardName", e.target.value)}
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
              onChange={(e) => handlePaymentInputChange("wallet", e.target.value)}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Total Amount */}
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
        {!paymentComplete ? (
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
        ) : (
          <Alert
            severity="success"
            sx={{ mt: 3, borderRadius: 2, fontWeight: 500 }}
          >
            🎉 Payment of ₹{course.price} completed successfully!
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default CoursePurchase;
