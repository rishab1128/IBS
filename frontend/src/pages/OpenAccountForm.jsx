import { CssBaseline, AppBar, Toolbar, IconButton, Container, Avatar, Box, Button, InputAdornment, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import MenuIcon from '@mui/icons-material/Menu';
import TextFields from "../components/TextFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {phoneRegEx, aadharRegEx, panRegEx} from "../utils";
import userService from "../services/userService";
import Toast from "react-hot-toast";
import FormSidebar from "../components/FormSidebar";
import React, { useState, useEffect } from 'react';



// create schema validation
const schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  mobile: yup.string().required('Mobile Phone is required').matches(phoneRegEx, 'Phone number is not valid'),
  email: yup.string().required('Email is required').email(),
  aadharNo: yup.string().required('Aadhar Number is required').matches(aadharRegEx, 'Aadhar Number should be of 16 digits'),
  dob: yup.string().required('Date of birth is required'),
  panNo: yup.string().required('PAN is required').matches(panRegEx,'PAN is not valid')
});

const OpenAccountForm = () => {
  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      aadharNo:'',
      dob:'',
      panNo:''
    },
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    userService.saveUser(data).then((res)=>{
      Toast.success(`Your acc number is ${res.data.accNo}.`);
      navigate("/register");
      reset();
    }).catch((err)=>{
      console.log(err);
      if(err?.response?.data?.success===false)
      {
        Toast.error(`${err?.response?.data.messageString}`);
      }
    })
    
  }

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
          <AssuredWorkloadIcon />
        </Avatar>
        <Typography component='h1'>OPEN A NEW ACCOUNT</Typography>

        {/* Form */}
        <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
          <TextFields errors={errors} control={control} name='firstName' label='First Name' />
          <TextFields errors={errors} control={control} name='lastName' label='Last Name' />
          <TextFields errors={errors} control={control} name='mobile' label='Mobile Phone' inputProps={{
          startAdornment: <InputAdornment position="start">+91</InputAdornment>
          }} />
          <TextFields errors={errors} control={control} name='email' label='Email' />
          <TextFields errors={errors} control={control} name='aadharNo' label='Aadhar Number' />
          <TextFields errors={errors} control={control} name='panNo' label='PAN Number'/>
          <TextFields errors={errors} control={control} name='dob' label='' inputProps={{type:"date"}}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Open</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default OpenAccountForm;