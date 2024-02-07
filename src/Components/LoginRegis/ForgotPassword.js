import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function ForgotPassword() {
    const [users, setUsers] = useState({
        username: "",
      }); 
    
      const handleCheckUser = async (e) => {
        e.preventDefault();
        const username = users.username.trim(); 
        if (!username) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter a username.",
            });
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/check-username`, {
                username: username,
            });
            if (response.data.usernameExists) {
                window.location.href = `/resetpassword/${response.data.userId}`;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Username does not exist!",
                    text: "Please check the username and try again.",
                });
            }
        } catch (error) {
            console.error("Error checking username:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again later.",
            });
        }
    };
    
      return (
        <div className="d-flex justify-content-center align-items-center vh-100 bgPage">
          <div className="p-3 rounded w-25 border loginForm">
            <h2>Please Enter Username</h2>
            <form onSubmit={handleCheckUser}>
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
              <div className="text-center">
                <p></p>
                <p>
                  <Button type="submit" className="btn btn-success w-50 rounded-0">
                    Check user
                  </Button>
                </p>
                <p></p>
                <p>
                  <Link to="/" className="link-opacity-75 tw">
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
    }
export default ForgotPassword