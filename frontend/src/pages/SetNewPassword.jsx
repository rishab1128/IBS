import { Container, Avatar, Box, Button, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import PasswordFields from "../components/PasswordFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pswdRegEx } from "../utils";
import { useNavigate } from "react-router-dom";

// create schema validation
const schema = yup.object({
  loginPassword: yup
    .string()
    .required("Login Password is required")
    .matches(
      pswdRegEx,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmLoginPassword: yup
    .string()
    .oneOf([yup.ref("loginPassword"), null], "Password must match"),
});

const SetNewPassword = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      loginPassword: "",
      confirmLoginPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/enterOtp");
    reset();
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "4rem",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1">SET NEW PASSWORD</Typography>

        {/* Form */}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", mt: "2rem" }}
        >
          <PasswordFields
            errors={errors}
            control={control}
            name="loginPassword"
            label="Set Login Password"
            type="password"
          />
          <PasswordFields
            errors={errors}
            control={control}
            name="confirmLoginPassword"
            label="Confirm Login Password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SetNewPassword;
