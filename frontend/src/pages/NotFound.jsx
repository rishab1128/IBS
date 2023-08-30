import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2 }}>
          <span style={{ color: 'red' }}>404</span>
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          <span style={{ color: 'red' }}>Page Not Found</span>
        </Typography>
        <Typography variant="body1">
          Oops! The page you are looking for doesn't exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
