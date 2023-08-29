import { Container, Avatar, Box, Button, Typography } from "@mui/material"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Modal,
  Paper,
  List,
  ListItem,
  Alert
} from '@mui/material';
import {useState, useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import TextFields from "../components/TextFields";
import SelectFields from "../components/SelectFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { accountRegEx } from "../utils";
import userService from "../services/userService";
import authService from "../services/authService";
import ShowBalance from "../components/ShowBalance";
import Navbar from "../components/Navbar";

// create schema validation
const schema = yup.object({
  receiver: yup.string().required('Receiver Account Number is required'),
  amount: yup.string().required('Amount to be transfered is required'),
  mode: yup.string().required('Mode of payment is required')
});

const FundTransfer2 = () => {
  
    const [modalOpen, setModalOpen] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [errorMsg , setErrorMsg] = useState('');

  
    const accountInfo = authService.getAccountInfo();
    console.log(accountInfo);

    const { handleSubmit, reset, formState: { errors }, control } = useForm({
        defaultValues: {
        payer: `${accountInfo?.accountNumber}`,
        receiver: '',
        amount:'',
        mode:''
        },
        resolver: yupResolver(schema)
    });
    

    const navigate = useNavigate();
    const onSubmit = (data) => {
        // console.log(data);
        userService.fundTransfer(data).then((res)=>{
            console.log(res);
            setTransactionStatus("success");
            accountInfo.accBalance -= res.data.amount;
            localStorage.setItem('accountInfo',JSON.stringify(accountInfo));
            setTransactionData(res.data);
            setErrorMsg('');
        }).catch((error)=>{
            console.log(error);
            setTransactionStatus("error");
            setErrorMsg(`${error.data.messageString}`);
        }).finally(() => {
            setModalOpen(true);
        });
        reset();
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setTransactionStatus(null);
        setTransactionData(null);
    };

    let objectDate = new Date();

    let day = objectDate.getDate();

    let month = objectDate.getMonth()+1;

    let year = objectDate.getFullYear();

    let dateFormat = day + "/" + month + "/" + year;

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar/>
        <Container maxWidth="xs">
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: '4rem',
            alignItems: 'center'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SwapHorizIcon/>
            </Avatar>
            <Typography component='h1'>FUND TRANSFER</Typography>

            {/* Form */}
            <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%', mt: '2rem' }}>
                <TextFields disabled={true} errors={errors} control={control} name='payer' label='From Account Number' />
                <TextFields errors={errors} control={control} name='receiver' label='To Account Number' />
                <TextFields errors={errors} control={control} name='amount' label='Amount to be transfered' />
                <SelectFields errors={errors} control={control} name='mode' label='Mode of Transfer'/>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Transfer</Button>
            </Box>
            </Box>
        </Container>
        <Modal open={modalOpen} onClose={handleCloseModal}>
            <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {transactionStatus === "success" ? (
                <>
                    <Typography variant="h6" color="success.main">Transaction Successful</Typography>
                    <List>
                        <ListItem><b>Transaction ID</b> : {transactionData.transId} </ListItem>
                        <ListItem><b>Mode of Transfer</b> : {transactionData.mode} </ListItem>
                        <ListItem><b>Paid to Account Number</b> : {transactionData.receiver} </ListItem>
                        <ListItem><b>Amount Transferred</b> : {transactionData.amount}</ListItem>
                        <ListItem><b>From Account Number</b> : {transactionData.payer} </ListItem>
                        <ListItem><b>On (Date)</b> : {dateFormat}</ListItem>
                    </List>
                </>
                ) : (
                <>
                    <Typography variant="h6" color="error.main">Transaction Unsuccessful</Typography>
                    <Alert severity="error">{errorMsg.substring(0,errorMsg.length-4)}</Alert>
                </>
                )}
            </Paper>
        </Modal>
        </div>
    )
}

export default FundTransfer2;