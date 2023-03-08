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
import BoardView from "./BoardView";
import BoardForm from "./BoardForm";
import IssueForm from "./IssueForm";
import MyIssues from "./IssuesView";
import Boards from "./Boards";
import MyApp from "./Test";
import Contact from "./Contact"
import Faq from "./Faq";
import Footer from "./Footer"
import { Container } from '@mui/material';


function GetToken() {
  useToken();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GetToken />
        <Nav />
        <Container sx={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:board_id/view" element={<BoardView />} />
          <Route path="/boards/create" element={<BoardForm />} />
          <Route path="/boards/:board_id/swimlane/:swimlane_id/issues/create" element={<IssueForm />} />
          <Route path="/test" element={<MyApp />} />
          <Route path="/issues" element={<MyIssues />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        </Container>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
