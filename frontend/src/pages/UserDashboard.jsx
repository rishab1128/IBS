import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Paper } from "@mui/material";
import authService from "../services/authService";
import userService from "../services/userService";
import userAvatar from "../assets/user-avatar.jpg";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const authUser = authService.getAuthUser();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await userService.getUser(authUser?.userId);
      console.log(result);
      setUser(result?.data);
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const accountInfo = {
    userId: authUser?.userId,
    firstName: user?.firstName,
    lastName: user?.lastName,
    accountNumber: user?.accNo,
    accBalance: user?.accBalance,
    aadharNumber: user?.aadharNo,
    mobileNumber: user?.mobile,
    email: user?.email,
    panNumber: user?.panNo,
  };

  localStorage.setItem("accountInfo", JSON.stringify(accountInfo));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navbar />
      <Container
        sx={{
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Paper sx={{ width: 150, height: 150 }}>
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5">Account Information</Typography>
              <Typography variant="body1">
                Full Name: {accountInfo.firstName} {accountInfo.lastName}
              </Typography>
              <Typography variant="body1">
                User ID: {accountInfo.userId}
              </Typography>
              <Typography variant="body1">
                Account Bal: {accountInfo.accBalance}
              </Typography>
              <Typography variant="body1">
                Account Number: {accountInfo.accountNumber}
              </Typography>
              <Typography variant="body1">
                Aadhar Number: {accountInfo.aadharNumber}
              </Typography>
              <Typography variant="body1">
                Mobile Number: {accountInfo.mobileNumber}
              </Typography>
              <Typography variant="body1">
                Email: {accountInfo.email}
              </Typography>
              <Typography variant="body1">
                PAN Number: {accountInfo.panNumber}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserDashboard;
