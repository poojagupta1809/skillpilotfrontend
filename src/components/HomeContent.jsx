import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from './Footer';


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

  const heroImage = "https://www.shutterstock.com/image-photo/elearning-education-online-exam-concept-260nw-2422421261.jpg"
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


  <Box sx={{ flexGrow: 1, px: { xs: 1, md: 2 }, py: 0, bgcolor: '#ffffff' }}>
   <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: { xs: '25vh', md: '40vh' }, 
        borderRadius: 5, 
        overflow: 'hidden', 
        mb: 6 
      }}>
        <img
          src={heroImage}
          alt="hero"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' ,
           objectPosition: 'center 20%'
          }}
        />
        <Box sx={{ 
    position: 'absolute', 
    top: '50%', 
    right: { xs: '10%', md: '7%' }, 
    transform: 'translateY(-50%)', 
    display: 'flex', 
    flexDirection: 'column', 
    color: 'white',
    maxWidth: { xs: '80%', md: '40%' },
  }}>
          <Typography 
      variant="h3" 
      sx={{ 
        fontFamily: 'Roboto, sans-serif', 
        fontWeight: 700, 
        mb: 2, 
        fontSize: { xs: '1.8rem', md: '2.8rem' }, 
        textShadow: '2px 2px 6px rgba(0,0,0,0.7)'
      }}
    >
      Gain Essential Skills to Enhance Your Career
    </Typography>
         <Typography 
      variant="h6" 
      sx={{ 
        fontFamily: 'Roboto, sans-serif', 
        fontWeight: 400, 
        lineHeight: 1.5,
        fontSize: { xs: '0.9rem', md: '1.2rem' },
        textShadow: '1px 1px 4px rgba(0,0,0,0.6)', 
      }}
    >
            Empowering learners with top-quality online courses and resources to boost your skills.
          </Typography>
        </Box>
      </Box>

   
      

{/*       
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
      </Box> */}
 <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        p: { xs: 2, md: 4 },
        bgcolor: '#ffffff',
      }}
    >
    
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            color: '#0d3980',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            mb: 2,
          }}
        >
          Unlock Your Potential with In-Demand Skills
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#333',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          SkillPilot helps you build in-demand skills fast and advance your career in a changing job market.
        </Typography>
      </Box>

     
      <Box
        sx={{
          flex: 1.2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        {[
          'https://glomacs.com/images/uploads/2024/07/Artificial-Intelligence-Training-Courses.jpg',
          'https://www.timesanalytics.com/wp-content/uploads/2025/06/data-science-3.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGCDR5nBpsRnjkCoIccrnqoKpDSYUTG7MLA&s',
        ].map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`skill-${index}`}
            sx={{
             width: { xs: '45%', md: '32%' },   height: { xs: 130, md: 180 },
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  <Typography
  variant="h4"
  component="h1"
  gutterBottom
  align="center"
  sx={{
    fontFamily: 'Pacifico',
    color: '#0d3980ff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '0.1em',
    mt: { xs: 6, md: 10 }, 
  }}
>
  What Our Users Say
</Typography>

<Grid container justifyContent="center" spacing={4} sx={{ mb: 6 }}>
  {testimonials.map((testimonial, index) => (
    <Grid item key={index}>
      <TestimonialCard {...testimonial} />
    </Grid>
  ))}
</Grid>
  <Footer/>

    </Box>
    
  );
}

export default HomeContent;