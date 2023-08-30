import {
  Container,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import TextFields from "../components/TextFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { phoneRegEx } from "../utils";

// schema validation
const schema = yup.object({
  mobile: yup
    .string()
    .required("Mobile Phone is required")
    .matches(phoneRegEx, "Phone number is not valid"),
});

const ForgotCredentials = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      mobile: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/enterOtp");
    reset();
  };

  const location = useLocation();
  const propsData = location.state;

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
          <PersonIcon />
        </Avatar>
        <Typography component="h1">{propsData.content}</Typography>

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
            name="mobile"
            label="Mobile Phone"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
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

export default ForgotCredentials;
