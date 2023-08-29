import React, { useState,useEffect } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import userService from '../services/userService';
import authService from "../services/authService";
import ShowBalance from '../components/ShowBalance';
import Navbar from '../components/Navbar';



const AccountSummary = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const authUser = authService.getAuthUser();

  const [acc,setAcc] = useState([{
    "payer": 2,
    "receiver": 1,
    "mode": "neft",
    "transId": 17111,
    "amount": 60
}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =  async () => {
    try {
      const result = await userService.getUserTransaction(authUser?.userId);
      console.log(result);
      setAcc(result?.data)
    } catch (error) {
      console.log("Err : " , error);
    }
  }


  console.log(acc);
  


  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar/>
      <Container sx={{ marginTop: '80px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payer</TableCell>
                  <TableCell>Payee</TableCell>
                  <TableCell>Mode of Payment</TableCell>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Amount Transferred</TableCell>
                  {/* <TableCell>Current Balance</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {acc?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.payer}</TableCell>
                    <TableCell>{row.receiver}</TableCell>
                    <TableCell>{row.mode}</TableCell>
                    <TableCell>{row.transId}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    {/* <TableCell>{row.currentBalance}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default AccountSummary;
