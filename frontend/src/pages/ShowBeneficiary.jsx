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



const ShowBeneficiary = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const authUser = authService.getAuthUser();

  const [acc,setAcc] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =  async () => {
    try {
      const result = await userService.getBeneficiaries(authUser?.userId);
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
                  <TableCell>Beneficiary Name</TableCell>
                  <TableCell>Beneficiary Account Number</TableCell>
                  <TableCell>Reference ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {acc?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.benefName}</TableCell>
                    <TableCell>{row.benef}</TableCell>
                    <TableCell>{row.refNo}</TableCell>
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

export default ShowBeneficiary;
