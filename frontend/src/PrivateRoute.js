import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);
  return <Outlet />;
};

export default PrivateRoute;
