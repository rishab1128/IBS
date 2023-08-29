//@CrossOrigin(origins="*",allowedHeaders="*")
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Modal,
  Box,
  Alert,
  AlertTitle,
  List,
  ListItem
} from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import userService from '../services/userService';
import authService from "../services/authService";
import AdminSidebar from '../components/AdminSidebar';
import Pagination from '@mui/material/Pagination';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ApprovedUsers() {
  const [approvedUsers, setApprovedUsers] = useState([
    // { accNo: '12345', firstName: 'John', lastName: 'Doe', accBalance:10 },
  ]);


    useEffect(() => {
      fetchData();
    }, []);

    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showFilteredUsers, setShowFilteredUsers] = useState(false);
    const [open, setOpen] = useState(false);


    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
      const filtered = approvedUsers.filter(user => user?.accNo == searchQuery);
      setFilteredUsers(filtered);
      console.log(filteredUsers);
      setShowFilteredUsers(true);
      setOpen(true);
      setSearchQuery('');
    };

    const handleClose = () => setOpen(false);

    const authUser = authService.getAuthUser();  
    const fetchData =  async () => {
        try {
          const result = await userService.getApprovedUsers();
          console.log(result);
          const sortedRes = result?.data.sort((a, b) => b.accNo - a.accNo)
          setApprovedUsers(sortedRes)
        } catch (error) {
          console.log("Err : " , error);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 2;

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = approvedUsers.slice(indexOfFirstEntry, indexOfLastEntry);

    const totalPages = Math.ceil(approvedUsers.length / entriesPerPage);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };


    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Bank Admin Dashboard
                </Typography>
            </Toolbar>
      </AppBar>
      <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Container sx={{ marginTop: '80px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <TextField
              label="Search by Account No."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account Number</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Acc Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentEntries.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user?.accNo}</TableCell>
                    <TableCell>{user?.firstName}</TableCell>
                    <TableCell>{user?.lastName}</TableCell>
                    <TableCell>{user?.accBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {showFilteredUsers ? (
                  filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                    <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Alert severity="success">
                              <AlertTitle>Sucess</AlertTitle>
                              Matching User Found!
                            </Alert>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <List>
                                  <ListItem><b>Account Number</b> : {user?.accNo} </ListItem>
                                  <ListItem><b>First Name</b> : {user?.firstName} </ListItem>
                                  <ListItem><b>Last Name</b> : {user?.lastName} </ListItem>
                                  <ListItem><b>Account Bal</b> : {user?.accBalance}</ListItem>
                                  <ListItem><b>Aadhar Number</b> : {user?.aadharNo} </ListItem>
                                  <ListItem><b>PAN Number</b> : {user?.panNo}</ListItem>
                                  <ListItem><b>Email</b> : {user?.email}</ListItem>
                                  <ListItem><b>Mobile</b> : {user?.mobile}</ListItem>
                              </List>
                            </Typography>
                            </Box>
                        </Modal>
                  )) : (
                    <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                      >
                          <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                  <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                      No Matching User Found!
                                  </Alert>
                              </Typography>
                          </Box>
                      </Modal>
                  )
                ) : null
              }
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
}

export default ApprovedUsers;
