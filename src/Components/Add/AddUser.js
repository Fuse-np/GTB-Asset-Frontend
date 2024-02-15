import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/adduser`,
        user
      );
      if (response.data.status === "ok") {
        Swal.fire("Add!", "", "success").then(() => {
          navigate("/dashboard/user");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: response.data.message || "Error adding user on the server.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Error adding user on the server.",
      });
    }
  };

  //authen
  const checkToken = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/authen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
        } else {
          window.location = "/blank";
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Add User</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputFullname" className="form-label fs-5">
              Fullname
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputFullname"
              name="fullname"
              value={user.fullname}
              placeholder="Enter Fullname"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputUsername" className="form-label fs-5">
              Username
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputUsername"
              name="username"
              value={user.username}
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label fs-5">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0 borderc"
              id="inputPassword"
              name="password"
              value={user.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label fs-5">
              Role
            </label>
            <select
              className="form-select rounded-0 borderc"
              id="inputRole"
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <p></p>
          <button
            className="btn btn-success w-100 rounded-0 mb-2 borderc"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
