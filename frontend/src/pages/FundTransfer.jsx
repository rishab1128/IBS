import { Container, Avatar, Box, Button, Typography } from "@mui/material"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {useState, useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import TextFields from "../components/TextFields";
import SelectFields from "../components/SelectFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { accountRegEx } from "../utils";
import userService from "../services/userService";
import authService from "../services/authService";
import ShowBalance from "../components/ShowBalance";
import Navbar from "../components/Navbar";

// create schema validation
const schema = yup.object({
  // payer: yup.number().required('Payer Account Number is required').matches(accountRegEx, 'Account Number should be of 3 digits'),
  // receiver: yup.number().required('Receiver Account Number is required').matches(accountRegEx, 'Account Number should be of 3 digits'),
  // amount: yup.number().required('Amount to be transfered is required'),
  mode: yup.string().required('Mode of payment is reqd')
});

const FundTransfer = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  
  const accInfo = authService.getAccountInfo();
  console.log(accInfo);

  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
      payer: `${accInfo?.accountNumber}`,
      receiver: '',
      amount:'',
      mode:'neft'
    },
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
      // console.log(data);
      userService.fundTransfer(data).then((res)=>{
        console.log(res);
        navigate({pathname:`/userDashboard/${accInfo?.userId}`}, {state:{userId: accInfo?.userId}});
      }).catch((error)=>{
        console.log(error);
      })
      reset();
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar/>
      <Container maxWidth="xs">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: '4rem',
          alignItems: 'center'
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SwapHorizIcon/>
          </Avatar>
          <Typography component='h1'>FUND TRANSFER</Typography>

          {/* Form */}
          <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
            <TextFields disabled={true} errors={errors} control={control} name='payer' label='From Account Number' />
            <TextFields errors={errors} control={control} name='receiver' label='To Account Number' />
            <TextFields errors={errors} control={control} name='amount' label='Amount to be transfered' />
            <SelectFields errors={errors} control={control} name='mode' label='Mode of Transfer'/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Transfer</Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default FundTransfer;