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
import Pagination from '@mui/material/Pagination';



const ShowBeneficiary = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const authUser = authService.getAuthUser();

  const [benef,setBenef] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =  async () => {
    try {
      const result = await userService.getBeneficiaries(authUser?.userId);
      console.log(result);
      setBenef(result?.data)
    } catch (error) {
      console.log("Err : " , error);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 2;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = benef.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(benef.length / entriesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  console.log(benef);
  


  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar/>
      <Container sx={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
                {currentEntries?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.benefName}</TableCell>
                    <TableCell>{row.benef}</TableCell>
                    <TableCell>{row.refNo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Container sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, newPage) => handlePageChange(newPage)}
                color="primary"
              />
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default ShowBeneficiary;
