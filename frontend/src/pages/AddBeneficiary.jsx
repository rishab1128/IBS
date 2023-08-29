import { Container, Avatar, Box, Button, Typography } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextFields from "../components/TextFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import authService from "../services/authService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";



// create schema validation
const schema = yup.object({
    benef: yup.string().required('Beneficiary Account Number is required'),
    benefName: yup.string().required('Beneficiary Name is required'),
    reEnterAccNo: yup.string().oneOf([yup.ref('benef'),null], 'Account Numbers should match')
});

const accInfo = authService.getAccountInfo();


const AddBeneficiary = () => {
  const { handleSubmit, reset, formState: { errors, isDirty, isValid }, control } = useForm({
    defaultValues: {
        benefName:'',
        benef:'',
        accNo: `${accInfo?.accountNumber}`,
        reEnterAccNo:''
    },
    resolver: yupResolver(schema)
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit =  (data) => {
    setIsSubmitted(true);
    console.log(data);
    const {reEnterAccNo , ...updated_data} = data;
    userService.addBeneficiary(updated_data).then((res)=>{
      console.log(res);
      toast.success('Beneficiary Added Successfully');
      // navigate({pathname:`/userDashboard/${accInfo?.userId}`}, {state:{userId: accInfo?.userId}});
    }).catch((error)=>{
      const errMsg = error.data.messageString;
      toast.error(`${errMsg.substring(0,errMsg.length-3)}`);
      console.log(error);
    })
    reset();
    setIsSubmitted(false);
  }

  const navigate = useNavigate();

  

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
                    <PersonAddIcon />
                </Avatar>
                <Typography component='h1'>ADD NEW BENEFICIARY</Typography>

                {/* Form */}
                <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
                    <TextFields disabled={true} errors={errors} control={control} name='accNo' label='Your Account Number' />
                    <TextFields errors={errors} control={control} name='benefName' label='Beneficiary Name' />
                    <TextFields errors={errors} control={control} name='benef' label='Beneficiary Account Number' />
                    <TextFields errors={errors} control={control} name='reEnterAccNo' label='Re-enter Account Number' />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitted || !isDirty || !isValid}
                    >Add Beneficiary</Button>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>{navigate("/showbeneficiary")}}
                >Show Beneficiaries</Button>
            </Box>
        </Container>
    </div>
  )
}

export default AddBeneficiary