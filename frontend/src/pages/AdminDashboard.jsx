import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Sidebar from '../components/Sidebar';
import authService from "../services/authService";
import userService from '../services/userService';
import userAvatar from '../assets/user-avatar.jpg'; 
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import MediaCard from '../components/MediaCard';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Bank Admin Dashboard
                </Typography>
            </Toolbar>
      </AppBar>
      <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Container sx={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <MediaCard
              title="Show Pending Requests"
              compBody="These users have not been approved by the admin yet."
              propLink="/pendingUsers"
              imageSrc={userAvatar} 
            />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <MediaCard
              title="Show Approved Users"
              compBody="These users have been approved and have an account in our bank"
              propLink="/approvedUsers"
              imageSrc={userAvatar} 
            />
          </Grid>
        </Grid>
      </Container>
    </div> 
  );
};

export default AdminDashboard;
