import React from "react";
import { Link } from "react-router-dom";
import { useToken } from "./auth.js";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

function BoardForm() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const { token } = useToken();
  if (!token) {
    return <div>Please Log In</div>;
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name;

    const boardsUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(boardsUrl, fetchConfig);
    if (response.ok) {
      const entry = await response.json();
      navigate("/boards");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleSubmit} id="login-form">
          <div className="row">
            <div className="form">
              <input
                onChange={handleNameChange}
                required
                placeholder="name"
                type="text"
                id="name"
                name="name"
                className="form"
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <button variant="outlined" size="large">
            Create Board
          </button>
        </form>
      </div>
      <div className="kanagiraism">
        <h2>"No more excuses, Kanagira has your back."</h2>
      </div>
    </div>
  );
}

export default BoardForm;
