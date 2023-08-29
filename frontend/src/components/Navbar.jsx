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

const Navbar = () => {

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

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const accountInfo = authService.getAccountInfo();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bank Account Dashboard
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<CurrencyRupeeIcon />} sx={{ marginLeft: "auto" }} onClick={handleOpen}>Show Balance</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hello! {accountInfo.userId}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Your current account balance is Rs.{accountInfo.accBalance}
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  )
}

export default Navbar;