import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import toast from "react-hot-toast";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import authService from "../services/authService";

const AdminSidebar = ({ isOpen, onClose }) => {
  const authUser = authService.getAuthUser();

  const sidebarItems = [
    { text: "Dashboard", icon: <PersonIcon />, link: "/admin/dashboard" },
    { text: "Pending Users", icon: <GroupRemoveIcon />, link: "/pendingUsers" },
    { text: "Approved Users", icon: <GroupAddIcon />, link: "/approvedUsers" },
    { text: "Logout", icon: <ExitToAppIcon /> },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("admin");
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div
        style={{ marginTop: "50px", display: "flex", flexDirection: "column" }}
      >
        <IconButton
          color="inherit"
          aria-label="Close"
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            marginRight: "10px",
            marginTop: "5px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {sidebarItems.map((item, index) =>
            item.text === "Logout" ? (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link to={"/"} onClick={handleLogout}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            ) : (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link to={item.link}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            )
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default AdminSidebar;
