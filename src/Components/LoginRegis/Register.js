import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [users, setUsers] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleRegis = async (e) => {
      e.preventDefault();
      if (!users.username || users.username.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a username.",
        });
        return;
      }
      if (!users.password || users.password.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a password.",
        });
        return;
      }
      if (users.username.length < 5) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Username should be at least 5 characters",
        });
        return;
      }
      if (users.password.length < 8) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password should be at least 8 characters",
        });
        return;
      }
      if (users.password !== users.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Passwords do not match!",
        });
        return;
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
          username: users.username,
          password: users.password,
        });
        if (response.data.status === "ok") {
          Swal.fire({
            icon: "success",
            title: "Registration successful!",
            showConfirmButton: true,
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        } else if (response.data.status === "error") {
          if (response.data.message === "Username already exists.") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Username already exists. Please choose a different username.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Registration failed! Please try again later.",
            });
          }
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Registration failed! Please try again later.",
        });
      }
    };

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bgPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2>Register</h2>
          <form onSubmit={handleRegis}>
            <div>
              <label htmlFor="name">
                <strong>Username :</strong>
              </label>
              <input
                type="name"
                name="username"
                autoComplete="off"
                placeholder="Enter Username"
                className="form-control rounded-0"
                onChange={(e) => setUsers({ ...users, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password">
                <strong>Password :</strong>
              </label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                className="form-control rounded-0"
                onChange={(e) => setUsers({ ...users, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">
                <strong>Confirm Password :</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                className="form-control rounded-0"
                onChange={(e) =>
                  setUsers({ ...users, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="text-center">
              <p></p>
              <p>
                <Button type="submit" className="btn btn-success w-50 rounded-0">
                  Register
                </Button>
              </p>
              <p></p>
              <p>
                <Link to="/" className="link-opacity-75 tw">
                  Already have an account? Back to Login.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

export default Register