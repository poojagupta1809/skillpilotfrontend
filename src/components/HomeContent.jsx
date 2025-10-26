import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import TestimonialCard from './TestimonialCard';

function HomeContent() {


    const testimonials = [
      {
        name: 'Jane Doe',
        feedback: 'You prepare people to carry out skills in the real world. Keep up the good work. What I have learned in this course, I will be able to apply in the real world.!',
        avatarSrc: 'https://example.com/jane-avatar.jpg', 
      },
      {
        name: 'John Smith',
        feedback: 'Course materials were good.The instructor did a good job of communicating and making it a more intimate arrangement.',
        avatarSrc: 'https://example.com/john-avatar.jpg', 
      },
      {
        name: 'Alice Johnson',
        feedback: 'A game-changer for my career. I can\'t imagine learning without it now.',
        avatarSrc: 'https://example.com/alice-avatar.jpg', 
      },
    ];
    
    return (
     <Box sx={{ flexGrow: 1, p: 3 }}>
         <Typography variant="h4" gutterBottom>Welcome to the Skill Pilot Home Page!</Typography>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            What Our Users Say
          </Typography>
          <Grid container justifyContent="center" spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Box>
  );
}

export default HomeContent;