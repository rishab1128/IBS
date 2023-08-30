import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function MediaCard(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.propLink);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        image={require("../assets/user-avatar.jpg")}
        title="user avatar"
        sx={{ height: 340, padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {props.compBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={handleClick}>
          Show
        </Button>
      </CardActions>
    </Card>
  );
}
