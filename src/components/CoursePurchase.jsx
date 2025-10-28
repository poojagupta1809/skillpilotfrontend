import React, { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const CoursePurchase = ({ course }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  if (!course || !course.price) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Billing Summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography>Course Price</Typography>
        <Typography sx={{ fontWeight: 500 }}>₹{course.price}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Payment Method
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
  );
};

export default CoursePurchase;
