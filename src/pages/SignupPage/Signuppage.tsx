import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const user = useAuth();
  const handlesignupbutton = () => {
    user.signup(email, password).catch(() => {
      navigate("/login");
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Handle sign up logic here
      }}
    >
      <h2>Sign Up</h2>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" onClick={handlesignupbutton}>
        Sign Up
      </button>
    </form>
  );
}
