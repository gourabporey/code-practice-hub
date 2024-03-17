import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password });
  };

  return (
    <>
      <h2>Login</h2>
      <input
        placeholder="Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        placeholder="Password"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input type="button" onClick={handleSubmit} value="Login" />
    </>
  );
};

export default Login;
