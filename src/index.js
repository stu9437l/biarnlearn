import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserRoute from "./routing/user/route";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "./storage/authProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <ToastContainer />
      <UserRoute />
    </BrowserRouter>
  </AuthProvider>
);
