import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

export const AuthGuard = () => {
  const authUser = authService.getAuthUser();
  return authUser ? <Outlet /> : <Navigate to={"/"} replace />;
};

export const AdminAuthGuard = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin ? <Outlet /> : <Navigate to={"/"} replace />;
};
