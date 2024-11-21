import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Подключаем стили

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Registration successful!");
        setTimeout(() => {
          navigate("/login"); // Переход на страницу логина
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {message && (
        <p
          className={`register-message ${
            message === "Registration successful!" ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Answer (Security Question):</label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <button onClick={() => navigate("/login")} className="btn-secondary">
        Go to Login
      </button>
    </div>
  );
};

export default Register;
