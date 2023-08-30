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

const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const authUser = authService.getAuthUser();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await userService.getUser(authUser?.userId);
      console.log(result);
      setUser(result?.data)
    } catch (error) {
      console.log("Err : " , error);
    }
  }

  const accountInfo = {
    userId : authUser?.userId,
    firstName: user?.firstName,
    lastName: user?.lastName,
    accountNumber: user?.accNo,
    accBalance: user?.accBalance,
    aadharNumber: user?.aadharNo,
    mobileNumber:user?.mobile,
    email: user?.email,
    panNumber: user?.panNo,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  localStorage.setItem('accountInfo',JSON.stringify(accountInfo));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar/>
      <Container sx={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} sx={{ p: 3, display: 'flex', justifyContent: 'center', height: '100%' }}>
              <Paper sx={{ width: 150, height: 150 }}>
                <img src={userAvatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5">Account Information</Typography>
              <Typography variant="body1">Full Name: {accountInfo.firstName} {accountInfo.lastName}</Typography>
              <Typography variant="body1">User ID: {accountInfo.userId}</Typography>
              <Typography variant="body1">Account Bal: {accountInfo.accBalance}</Typography>
              <Typography variant="body1">Account Number: {accountInfo.accountNumber}</Typography>
              <Typography variant="body1">Aadhar Number: {accountInfo.aadharNumber}</Typography>
              <Typography variant="body1">Mobile Number: {accountInfo.mobileNumber}</Typography>
              <Typography variant="body1">Email: {accountInfo.email}</Typography>
              <Typography variant="body1">PAN Number: {accountInfo.panNumber}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserDashboard;
