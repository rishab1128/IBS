import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import UsersList from './components/usersList/UsersList';
import RegisterForm from './pages/RegisterForm';
import OpenAccountForm from './pages/OpenAccountForm';
import SetNewPassword from './pages/SetNewPassword';
import EnterOtp from './pages/EnterOtp';
import LoginForm from './pages/LoginForm';
import ShowMessage from './pages/ShowMessage';
import ForgotCredentials from './pages/ForgotCredentials';
import AccountSummary from './pages/AccountSummary';
import FundTransfer from './pages/FundTransfer';
import NotFound from './pages/NotFound'; 
import AdminDashboard from './pages/AdminDashboard';
import {AuthGuard,AdminAuthGuard} from "./guards/authGuard"
import authService from './services/authService';
import PendingUsers from './pages/PendingUsers';
import ApprovedUsers from './pages/ApprovedUsers';
import AddBeneficiary from './pages/AddBeneficiary';
import HomePage2 from './pages/HomePage2';
import FundTransfer2 from './pages/FundTransfer2';
import AdminLogin from './pages/AdminLogin';
import Withdraw from './pages/Withdraw';
import ShowBeneficiary from './pages/ShowBeneficiary';
import { Toaster } from 'react-hot-toast';


function App() {

  const authUser = authService.getAuthUser();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false}/>
        {/* <div className="container"> */}
          <Routes>
            <Route path="*" exact element={<NotFound/>} />
            {/* <Route path="/" exact element={<HomePage/>}/> */}
            <Route path="/" exact element={authUser?<UserDashboard/>:<HomePage2/>} />
            <Route path="/openaccount" element={<OpenAccountForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/enterOtp" element={<EnterOtp/>} />
            <Route path="/setnewpassword" element={<SetNewPassword/>} />
            <Route path="/forgotcredentials" element={<ForgotCredentials/>} />
            <Route path="/showMessage" exact element={<ShowMessage/>} />
            <Route path="/admin/login" exact element = {<AdminLogin/>} />
            <Route element = <AdminAuthGuard/>>
              <Route path="/admin/dashboard" exact element={<AdminDashboard/>} />
              <Route path="/pendingUsers" exact element={<PendingUsers/>} />
              <Route path="/approvedUsers" exact element={<ApprovedUsers/>} />
            </Route>
            <Route element={<AuthGuard/>}>
              <Route path="/userDashboard/:userId" exact element={<UserDashboard/>} />
              <Route path="/showTransactions" exact element={<AccountSummary/>} />
              <Route path="/fundTransfer" exact element={<FundTransfer2/>} />
              <Route path="/addbeneficiary" exact element={<AddBeneficiary/>} />
              <Route path="/showbeneficiary" exact element={<ShowBeneficiary/>} />
              <Route path="/withdraw" exact element={<Withdraw/>} />
            </Route>
          </Routes>
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
