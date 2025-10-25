import React from 'react';
import { Typography, Box } from '@mui/material';

function HomeContent() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome to the Home Page!</Typography>
      <Typography variant="body1">This is the main content area.</Typography>
    </Box>
  );
}

export default HomeContent;