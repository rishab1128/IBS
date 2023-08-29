import { Container, Avatar, Box, Button, Typography } from "@mui/material"
import PasswordIcon from '@mui/icons-material/Password';
import TextFields from "../components/TextFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// create schema validation
const schema = yup.object({otp:yup.string().required('OTP is required')});

const EnterOtp = () => {
  const { handleSubmit, reset, formState: { errors }, control } = useForm({
    defaultValues: {
      otp:''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '4rem',
        alignItems: 'center'
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PasswordIcon/>
        </Avatar>
        <Typography component='h1'>ENTER OTP</Typography>

        {/* Form */}
        <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
          <TextFields errors={errors} control={control} name='otp' label='Enter OTP' />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Submit</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EnterOtp;