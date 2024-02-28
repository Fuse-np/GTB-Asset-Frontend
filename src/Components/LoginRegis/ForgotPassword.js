import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [showITSecret, setShowITSecret] = useState(false);

  const [users, setUsers] = useState({
    username: "",
    itsecret: "",
  });

  const handleCheckUser = async (e) => {
    e.preventDefault();
    const { username, itsecret } = users;
    if (!username || !itsecret) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter both username and ITSecret.",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/check-username`,
        {
          username: username,
          itsecret: itsecret,
        }
      );
      if (response.data.usernameExists) {
        window.location.href = `/resetpassword/${response.data.userId}`;
      } else if (response.data.status === "ITSecret") {
        Swal.fire({
          icon: "error",
          title: "Incorrect IT Secret",
          text: "The IT Secret you entered is incorrect. Please try again.",
        });
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
        <h2>Please Verify your identity</h2>
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
          <div>
            <label htmlFor="ITSecret">
              <strong>ITSecret :</strong>
            </label>
            <div className="input-group">
              <input
                type={showITSecret ? "text" : "password"}
                name="ITSecret"
                autoComplete="off"
                placeholder="Enter ITSecret"
                className="form-control rounded-0"
                onChange={(e) =>
                  setUsers({ ...users, itsecret: e.target.value })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowITSecret(!showITSecret)}
                  style={{ borderRadius: "0" }}
                >
                  <FontAwesomeIcon icon={showITSecret ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p></p>
            <p>
              <Button type="submit" className="btn btn-success w-50 rounded-0">
                Check username
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
export default ForgotPassword;
