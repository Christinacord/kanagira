import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { AuthProvider, useToken } from "./auth.js";
import LoginComponent from "./LoginForm";
import SignupComponent from "./SignupForm";
import Boards from "./Boards";
import BoardForm from "./BoardForm";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GetToken />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/create" element={<BoardForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
