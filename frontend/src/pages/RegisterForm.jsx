import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import TextFields from "../components/TextFields";
import PasswordFields from "../components/PasswordFields";
import CheckboxFields from "../components/CheckboxFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pswdRegEx } from "../utils";
import userService from "../services/userService";
import toast from "react-hot-toast";
import { useState } from "react";
import FormSidebar from "../components/FormSidebar";

// schema validation
const schema = yup.object({
  accNo: yup.string().required("Account Number is required"),
  userId: yup.string().required("User ID is required"),
  loginPass: yup
    .string()
    .required("Login Pass is required")
    .matches(
      pswdRegEx,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmLoginPass: yup
    .string()
    .oneOf([yup.ref("loginPass"), null], "Pass must match"),
  transPass: yup
    .string()
    .required("Transaction Pass is required")
    .matches(
      pswdRegEx,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmTransactionPass: yup
    .string()
    .oneOf([yup.ref("transPass"), null], "Pass must match"),
  privacy: yup.bool().oneOf([true], "Field must be checked"),
});

const RegisterForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm({
    defaultValues: {
      accNo: "",
      userId: "",
      loginPass: "",
      confirmLoginPass: "",
      transPass: "",
      confirmTransactionPass: "",
      privacy: false,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    const {
      confirmLoginPass,
      confirmTransactionPass,
      privacy,
      ...updated_data
    } = data;
    userService
      .saveUserId(updated_data)
      .then((res) => {
        console.log(res);
        toast.success("You have been successfully registered");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error?.data?.messageString === "User Id  Already Exists :404")
          toast.error("User Id  Already Exists");
        else
          toast.error(
            "Either you have entered a wrong acc No Or You have not been approved yet"
          );
      });
    reset();
    setIsSubmitted(false);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Internet Banking System
          </Typography>
        </Toolbar>
      </AppBar>
      <FormSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "4rem",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1">REGISTER FOR NET BANKING</Typography>

        {/* Form */}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", mt: "2rem" }}
        >
          <TextFields
            errors={errors}
            control={control}
            name="accNo"
            label="Account Number"
          />
          <TextFields
            errors={errors}
            control={control}
            name="userId"
            label="Set User ID"
          />
          <PasswordFields
            errors={errors}
            control={control}
            name="loginPass"
            label="Set Login Password"
            type="password"
          />
          <PasswordFields
            errors={errors}
            control={control}
            name="confirmLoginPass"
            label="Confirm Login Password"
          />
          <PasswordFields
            errors={errors}
            control={control}
            name="transPass"
            label="Set Transaction Password"
          />
          <PasswordFields
            errors={errors}
            control={control}
            name="confirmTransactionPass"
            label="Confirm Transaction Password"
          />
          <CheckboxFields errors={errors} control={control} name="privacy" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // disabled={isSubmitted || !isDirty || !isValid}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
