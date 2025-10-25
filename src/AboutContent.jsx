import React from "react";
import { Container, Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function AboutContent() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
            About SkillPilot
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Empower your learning journey, one skill at a time.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            SkillPilot is a next-generation learning platform designed to help you discover, learn,
            and master new skills. Whether you're a student, professional, or lifelong learner,
            SkillPilot gives you the tools, courses, and personalized guidance to take charge of your growth.
          </Typography>
        
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
            alt="SkillPilot Learning"
            sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
          />
        </Grid>
      </Grid>

      {/* Mission Section */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
          Our mission is to make skill development accessible, practical, and inspiring for everyone — helping
          you navigate your path to success with confidence. With SkillPilot, you don’t just learn — you grow.
        </Typography>
      </Box>
    </Container>
  );
}