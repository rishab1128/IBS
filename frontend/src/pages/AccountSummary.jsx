import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import userService from "../services/userService";
import authService from "../services/authService";
import Navbar from "../components/Navbar";
import Pagination from "@mui/material/Pagination";

const AccountSummary = () => {
  const authUser = authService.getAuthUser();

  const [acc, setAcc] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await userService.getUserTransaction(authUser?.userId);
      const sortedRes = result?.data.sort((a, b) => b.transId - a.transId);
      console.log(result);
      setAcc(sortedRes);
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = acc.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(acc.length / entriesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(acc);

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
        <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: "800px" }}>
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
                {currentEntries?.map((row, index) => (
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
          <Container
            sx={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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

export default AccountSummary;
