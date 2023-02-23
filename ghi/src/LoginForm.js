import React from "react";
import { Link } from "react-router-dom";

//handle change necessary?
//form input types?
//classnames for form - material ui?

function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

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

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const url = "http://localhost:8000/token";
    const fetchConfig = {
      method: "POST",
      body: form,
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    }

    const getToken = await fetch(url, { credentials: "include" });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleSubmit} id="login-form">
          <div className="row">
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
          <Button variant="outlined" size="large">
            Sign Up
          </Button>
        </form>
      </div>
      <div className="signup-link">
        <h3 className="login-signup-link">Don't have an account?</h3>
        <Link to="/signup">
          <Button variant="outlined" size="large">
            Sign Up
          </Button>
        </Link>
      </div>
      <div className="kanagiraism">
        <h2>"Kanagira, because who wants to remember tasks on their own?"</h2>
      </div>
    </div>
  );
}

export default LoginForm;
