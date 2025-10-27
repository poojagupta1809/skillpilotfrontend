import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// TestimonialCard
const TestimonialCard = ({ name, feedback, avatarSrc }) => (
  <Box sx={{
    width: 300,
    p: 3,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: 2,
    textAlign: 'center',
    bgcolor: 'white'
  }}>
    <Avatar src={avatarSrc} sx={{ width: 64, height: 64, margin: 'auto', mb: 2 }} />
    <Typography variant="subtitle1" gutterBottom><strong>{name}</strong></Typography>
    <Typography variant="body2">{feedback}</Typography>
  </Box>
);

function HomeContent() {
  const images = [
    "https://media.istockphoto.com/id/1500285927/photo/young-woman-a-university-student-studying-online.jpg?s=612x612&w=0&k=20&c=yvFDnYMNEJ6WEDYrAaOOLXv-Jhtv6ViBRXSzJhL9S_k=",
    "https://t3.ftcdn.net/jpg/06/04/70/40/360_F_604704017_zHjlvfNLv06FIw2FulzbhwjOQeYUcGr3.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20250228/pngtree-indian-college-student-girl-working-at-computer-in-public-library-typing-image_17034205.jpg"
  ];

  const testimonials = [
    {
      name: 'Jane Doe',
      feedback: 'You prepare people to carry out skills in the real world. Keep up the good work!',
      avatarSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'John Smith',
      feedback: 'Course materials were good. The instructor did a good job communicating.',
      avatarSrc: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Alice Johnson',
      feedback: 'A game-changer for my career. I can\'t imagine learning without it now.',
      avatarSrc: 'https://randomuser.me/api/portraits/women/46.jpg',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: '#f5f5f5' }}>

   
       <Typography variant="h4" align="center" gutterBottom  
         sx={{
        fontFamily: 'Pacifico',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#0d3980ff', 
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '0.1em',
      }}>Welcome to the Skill Pilot!</Typography>

      
      <Box sx={{ width: { xs: '95%', md: '80%' }, margin: 'auto', mb: 6 }}>
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                width: '100%',
                paddingTop: { xs: '40%', md: '30%' }, 
                bgcolor: '#e0e0e0',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={img}
               alt={`slide-${index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

     <Typography variant="h4" component="h1" gutterBottom align="center"   sx={{
        fontFamily: 'Pacifico',
        color: '#0d3980ff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)', 
        letterSpacing: '0.1em',
      }}>
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