import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const handleSignin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    if (!username) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a username",
        });
        return; 
    }
    if (!password) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a password",
        });
        return; 
    }
    const jsonData = {
        username: username,
        password: password,
    };
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/login`,
            jsonData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data.status === "ok") {
            localStorage.setItem("token", response.data.token);
            window.location = "/dashboard";
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid username or password",
            });
        }
    } catch (error) {
        console.error("Error", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while processing your request",
        });
    }
};
    
      return (
        <div className="d-flex justify-content-center align-items-center vh-100 bgPage">
          <div className="p-3 rounded w-25 border loginForm">
            <h2>Login</h2>
            <form onSubmit={handleSignin}>
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
                />
              </div>
              <div className="text-center">
                <p></p>
                <Button
                  type="submit"
                  className="btn btn-success w-50 rounded-0 custom-card"
                >
                  Login
                </Button>
                <p></p>
                <p>
                  <Link to="/register" className="link-opacity-75 tw">
                    Register
                  </Link>
                </p>
                <p>
                  <Link to="/forgopassword" className="link-opacity-75 tw">
                    Forgot Password
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
    }

export default Login