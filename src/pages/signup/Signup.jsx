import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "../../auth/firebaseAuth";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    try {
      await signup(email, password);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <span className="input-span">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </span>
      <span className="input-span">
        <label htmlFor="confirmPassword" className="label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={passwordError ? "error" : ""}
        />
        {passwordError && <p className="error-text">{passwordError}</p>}
      </span>
      <input className="submit" type="submit" value="Sign up" />
      <span className="span">
        Already have an account? <Link to="/login">Log in</Link>
      </span>
    </form>
  );
};

export default Signup;
