import React from 'react';
import {Link} from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import toast from 'react-hot-toast';

const FormSidebar = ({ isOpen, onClose }) => {

  const sidebarItems = [
    { text: 'Home', icon: <HomeIcon /> , link: "/" },
    { text: 'Open Acc', icon: <AssuredWorkloadIcon /> , link: "/openaccount" },
    { text: 'Register', icon: <HowToRegIcon />, link: "/register" },
    { text: 'Login', icon: <LoginIcon /> , link: "/login" },
    { text: 'Admin', icon: <AdminPanelSettingsIcon />, link: "/admin/login" },
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
        <IconButton
          color="inherit"
          aria-label="Close"
          onClick={onClose}
          style={{ alignSelf: 'flex-end', marginRight: '10px', marginTop: '5px' }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link to={item.link}><ListItemText primary={item.text} /></Link>
              </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default FormSidebar;
