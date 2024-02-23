import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState({
    fullname: "",
    username: "",
    role: "",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const requiredFields = ["fullname", "username", "role"];
    for (const field of requiredFields) {
      if (!users[field] && users[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return; 
      }
    }
    for (const field in users) {
      if (users.hasOwnProperty(field) && users[field] === null) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} cannot be null.`,
        });
        return; 
      }
    }
    Swal.fire({
      title: "Confirm Update user data?",
      showCancelButton: true,
      confirmButtonText: "Update",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${process.env.REACT_APP_API_URL}/updateuser/${id}`, users)
          .then((res) => {
            Swal.fire("Update!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/user");
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Error updating data on the server.",
            });
          });
      }
    });
  };

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
        if (data.status !== "ok") {
          navigate("/blank");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/datauser/` + id)
      .then((res) => {
        console.log(res);
        setUsers({
          ...users,
          fullname: res.data[0].fullname,
          username: res.data[0].username,
          role: res.data[0].role,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Update User</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <label htmlFor="inputFullname" className="form-label fs-5">
              Fullname
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputFullname"
              placeholder="Enter Fullname"
              value={users.fullname}
              onChange={(e) =>
                setUsers({ ...users, fullname: e.target.value })
              }
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
              value={users.username}
              onChange={(e) =>
                setUsers({ ...users, username: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label fs-5">
              Role
            </label>
            <select
              className="form-select rounded-0 borderc"
              id="inputRole"
              value={users.role}
              onChange={(e) => setUsers({ ...users, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;