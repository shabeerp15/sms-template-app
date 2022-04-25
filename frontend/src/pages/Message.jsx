import React from "react";
import MenuAppBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Message = () => {
  const token = localStorage.getItem("token");
  const { templateId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let content = formData.get("content");
    const data = { templateId, content };
    try {
      const res = await axios.post("/api/message/create", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <>
      <MenuAppBar />
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography component="h1" variant="h5">
            Create Message
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="Enter Content"
              name="content"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Message;
