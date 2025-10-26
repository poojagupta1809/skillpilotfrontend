
    import React from 'react';
    import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
    import { deepOrange } from '@mui/material/colors';

    
function TestimonialCard ({ name, feedback, avatarSrc }) {
    
      return (
        <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }} src={avatarSrc}>
                {name.charAt(0)}
              </Avatar>
              <Typography variant="h6" component="div">
                {name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              "{feedback}"
            </Typography>
          </CardContent>
        </Card>
      );
    };


    export default TestimonialCard;