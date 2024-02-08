import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

function AddUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    fullname: "",
    username: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["fullname", "username", "password", "role"];
    for (const field of requiredFields) {
      if (!users[field] && users[field] !== 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${field} is required.`,
        });
        return;
      }
    }
    Swal.fire({
      title: "Confirm Add Data?",
      showCancelButton: true,
      confirmButtonText: "Add",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_API_URL}/adduser`)
          .then((res) => {
            if (res.status === 'ok') { 
              Swal.fire("Add!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/user");
                });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Error Add data on the server.',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'Error updating data on the server.',
            });
          });
      }
    });
  };

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
              placeholder="Enter Fullname"
              onChange={(e) => setUsers({ ...users, fullname: e.target.value })}
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
              placeholder="Enter Username"
              onChange={(e) => setUsers({ ...users, username: e.target.value })}
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
              placeholder="Enter Password"
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label fs-5">
              Role
            </label>
            <select
              className="form-select rounded-0 borderc"
              id="inputRole"
              onChange={(e) => setUsers({ ...users, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
