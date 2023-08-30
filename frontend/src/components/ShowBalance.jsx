import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import authService from "../services/authService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ShowBalance = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const accountInfo = authService.getAccountInfo();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CurrencyRupeeIcon />}
        sx={{ marginLeft: "auto" }}
        onClick={handleOpen}
      >
        Show Balance
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hello! {accountInfo?.userId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your current account balance is Rs.{accountInfo?.accBalance};
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ShowBalance;
