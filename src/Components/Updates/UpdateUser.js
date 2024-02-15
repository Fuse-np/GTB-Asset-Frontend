import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

function UpdateUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  /*   const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [
          `name`, `username`, `password`, `role`
        ];
        for (const field of requiredFields) {
          if (!swyearly[field] && swyearly[field] !== 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${field} is required.`,
            });
            return;
          }
        }
        for (const field in swyearly) {
          if (swyearly.hasOwnProperty(field) && swyearly[field] === null) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${field} cannot be null.`,
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
            axios.post(`${process.env.REACT_APP_API_URL}/addsw-yearly`, user)
              .then((res) => {
                Swal.fire("Add!", "", "success")
                  .then(() => {
                    console.log(res);
                    navigate("/dashboard/user");
                  });
              })
              .catch((err) => {
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: 'Server Error',
                  text: 'Error updating data on the server.',
                });
              });
              onSubmit={handleSubmit}
          }
        });
      };  */
      
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
        <form className="row g-1">
          <div className="col-12">
            <label for="inputFullname" className="form-label fs-5">
              Fullname
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputFullname"
              placeholder="Enter Fullname"
              onChange={(e) => setUsers({ ...users, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputUsername" className="form-label fs-5">
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
            <label for="inputPassword" className="form-label fs-5">
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
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
