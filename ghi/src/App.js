import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./Pages/Home/HomePage";
import "./App.css";
import { AuthProvider, useToken } from "./auth.js";
import LoginComponent from "./Pages/LoginForm";
import SignupComponent from "./Pages/SignupForm";
import Boards from "./Pages/Board/Boards";
import BoardView from "./Pages/Board/BoardView";
import BoardForm from "./Pages/Board/BoardForm";
import IssueForm from "./Pages/Issue/IssueForm";
import MyIssues from "./Pages/Issue/MyIssues";
import About from "./Pages/About"


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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:board_id/view" element={<BoardView />} />
          <Route path="/boards/create" element={<BoardForm />} />
          <Route path="/boards/:board_id/swimlane/:swimlane_id/issues/create" element={<IssueForm />} />
          <Route path="/issues" element={<MyIssues />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
