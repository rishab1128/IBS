import React, { useState, useEffect } from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton,Container, Avatar, Box, Button, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import TextFields from "../components/TextFields";
import PasswordFields from "../components/PasswordFields"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { pswdRegEx } from "../utils";
import {Link, useNavigate} from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import FormSidebar from "../components/FormSidebar";

// create schema validation
const schema = yup.object({
  adminId: yup.string().required('Admin ID is required'),
  loginPass: yup.string().required('Login Password is required').matches(pswdRegEx, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
});

const AdminLogin = () => {
  const { handleSubmit, reset, formState: { errors, isDirty, isValid }, control } = useForm({
    defaultValues: {
      adminId: '',
      loginPass: '',
    },
    resolver: yupResolver(schema)
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    console.log(data);
    if(data.adminId==="ADMIN" && data.loginPass==="AdminPass@1")
    {
        localStorage.setItem('admin' , JSON.stringify(data));
        toast.success('Successfully Logged In')
        navigate("/admin/dashboard");
    }
    else
    {
      toast.error('Invalid credentials')
    }
    
    setIsSubmitted(false)
    reset();
    
  }

  // console.log(userId);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <Container maxWidth="xs">
      <CssBaseline />
        <AppBar position="absolute">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Internet Banking System
                </Typography>
            </Toolbar>
      </AppBar>
      <FormSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '4rem',
        alignItems: 'center'
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AdminPanelSettingsIcon />
        </Avatar>
        <Typography component='h1'>LOGIN AS ADMIN</Typography>

        {/* Form */}
        <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
          <TextFields errors={errors} control={control} name='adminId' label='Enter Admin User ID' />
          <PasswordFields errors={errors} control={control} name='loginPass' label='Enter Login Password' type="password"/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitted || !isDirty || !isValid}
          >Login</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AdminLogin;