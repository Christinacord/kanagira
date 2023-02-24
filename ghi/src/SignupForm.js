import React from "react";
import { Link } from "react-router-dom";
import { useToken } from "./auth.js";
// import { Button } from "@mui/material";

//handle change necessary?
//form input types?
//classnames for form - material ui?
//The REACT_APP_ variable that you'll use may be different.
//Pay attention to the url value for the specific service you're using.

function SignupComponent() {
  const { token, signup } = useToken();

  const [full_name, setFull_name] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const handleFull_nameChange = (e) => {
    const value = e.target.value;
    setFull_name(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(full_name, username, email, password);
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <form onSubmit={handleSubmit} id="signup-form">
          <div className="row">
            <div className="form">
              <input
                onChange={handleFull_nameChange}
                required
                placeholder="full_name"
                type="text"
                id="full_name"
                name="full_name"
                className="form"
              />
              <label htmlFor="full_name">Full Name</label>
            </div>
            <div className="form">
              <input
                onChange={handleUsernameChange}
                required
                placeholder="username"
                type="text"
                id="username"
                name="username"
                className="form"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form">
              <input
                onChange={handleEmailChange}
                required
                placeholder="Email"
                type="text"
                id="Email"
                name="Email"
                className="form"
              />
              <label htmlFor="Email">Email</label>
            </div>
            <div className="form">
              <input
                onChange={handlePasswordChange}
                required
                placeholder="password"
                type="password"
                id="password"
                name="password"
                className="form"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button variant="outlined" size="large">
            Sign Up
          </button>
        </form>
      </div>
      {/* <div className="signup-link">
        <h3 className="login-signup-link">Don't have an account?</h3>
        <Link to="/signup">
          <Button variant="outlined" size="large">
            Sign Up
          </Button>
        </Link>
      </div> */}
      <div className="kanagiraism">
        <h2>"Kanagira, because who wants to remember tasks on their own?"</h2>
      </div>
    </div>
  );
}

export default SignupComponent;
