import { Box, Button, Container, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import MuiTable from "../components/MuiTable";
import MenuAppBar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const headings = ["Id", "Name", "Message", "Action"];

const HomePage = () => {
  const token = localStorage.getItem("token");
  const [templates, setTemplates] = React.useState([]);

  const navigate = useNavigate();

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("/api/template/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTemplates(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/template/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res?.data?.message);
      fetchTemplates();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <MenuAppBar />
      <Container component="main">
        <CssBaseline />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          onClick={() => navigate(`/template`)}>
          Create Template
        </Button>

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <MuiTable
            headings={headings}
            data={templates}
            handleDelete={handleDelete}
          />
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
