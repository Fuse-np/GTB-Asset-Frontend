import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (!passwords.newPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a new password.",
        });
        return;
      }
      if (
        passwords.newPassword.length < 8 ||
        passwords.newPassword.length > 30
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password should be between 8 and 30 characters.",
        });
        return;
      }
      if (!passwords.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please confirm your new password.",
        });
        return;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
        });
        return;
      }
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}/reset-password`,
        {
          newPassword: passwords.newPassword,
        }
      );
      console.log(response.data);
      if (response.data.status === "ok") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password updated successfully",
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while updating the password!",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bgPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Reset Password</h2>
        <form onSubmit={handlePasswordReset}>
          <div>
            <label htmlFor="newPassword">
              <strong>New Password :</strong>
            </label>
            <div className="input-group">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                autoComplete="off"
                placeholder="Enter New Password"
                className="form-control rounded-0"
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ borderRadius: "0" }}
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEye : faEyeSlash}
                  />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <strong>Confirm Password :</strong>
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                className="form-control rounded-0"
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ borderRadius: "0" }}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p></p>
            <p>
              <Button type="submit" className="btn btn-success w-50 rounded-0">
                Reset Password
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

export default ResetPassword;
