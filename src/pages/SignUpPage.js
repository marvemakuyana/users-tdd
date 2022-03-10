import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  let disabled = true;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((res) => console.log(res.data));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      username,
      email,
      password,
    };
    // axios.post("/api/users", userDetails);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res) {
          console.log(res);
        }
      });
  };

  return (
    <div>
      <form>
        <h1>Sign Up</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <input
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          placeholder="password repeat"
          type="password"
        />
        <button disabled={disabled} onClick={onSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
