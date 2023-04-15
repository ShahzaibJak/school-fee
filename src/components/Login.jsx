import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from 'axios'
import { auth } from "../services/auth-service";

function Login(props) {
  //const classes = useStyles();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("Password is required");
      return;
    }
    if (!username) {
      setError("Username is required");
      return;
    }
    try {
      var status = await auth.login(username,password)
      if (status){
        console.log("Logged In, going home")
        props.onLogin(true)
        history('/home')
      }
      else{
        setError("Invalid Login Credentials")
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <div className="root">
      <div className="frame">
        <h1>Welcome</h1>
        <h3 className="title">
          Student Fee Management<br></br>System
        </h3>
      </div>
      <form className="form" onSubmit={handleLogin}>
        <br></br>
        <Input
          type="text"
          placeholder="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}

        />
        <br></br>
        <Input
          placeholder="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          error={Boolean(error)}
        />
        <br></br><br></br>
        <label className="error">{error}</label>
        <br></br><br></br>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <br></br>
      </form>
    </div>
  );
}

export default Login;
