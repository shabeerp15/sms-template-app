import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MenuAppBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const Template = (props) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { state } = useLocation();
  // const { templateId } = state;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchTemplate = async (id) => {
    try {
      const res = await axios.get(`/api/template/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res", res?.data?.data?.name);
      setName(res?.data?.data?.name);
      setMessage(res?.data?.data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (state?.templateId) {
      fetchTemplate(state?.templateId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.templateId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { name, message };
      if (state?.templateId) {
        const res = await axios.put(
          `/api/template/${state?.templateId}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(res?.data?.message);
      } else {
        const res = await axios.post("/api/template/create", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(res?.data?.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <>
      <MenuAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {state?.templateId ? "Update Template" : "Create Template"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Template Message"
              name="message"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {state?.templateId ? "Update" : "Create"}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Template;
