import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadHardware() {
  const { id } = useParams();
  const [hardware, setHardware] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/read-hardware/` + id)
      .then((res) => {
        console.log(res);
        setHardware(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Data will be delete from Hardware Asset",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}/delete-hardware/` + id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/dashboard/hwasset");
      } else {
      }
    });
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

  return (
    <div className="container px-5 mt-3">
      <div className="d-flex justify-content-center shadow p-3 mb-4 bg-white rounded">
        <h3 className="display-4">Hardware Asset Detail</h3>
      </div>
      <div className="mt-3">
        <table
          className="table table-bordered table-striped table-lg"
          style={{ borderColor: "#007bff" }}
        >
          <tbody>
            <tr>
              <th className="text-center">Hardware Asset Number</th>
              <td className="text-center fs-5">{hardware.hw_assetnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Brand</th>
              <td className="text-center fs-5">{hardware.hw_brand}</td>
            </tr>
            <tr>
              <th className="text-center">Model</th>
              <td className="text-center fs-5">{hardware.hw_model}</td>
            </tr>
            <tr>
              <th className="text-center">User</th>
              <td className="text-center fs-5">{hardware.hw_user}</td>
            </tr>
            <tr>
              <th className="text-center">Location</th>
              <td className="text-center fs-5">{hardware.hw_location}</td>
            </tr>
            <tr>
              <th className="text-center">Department</th>
              <td className="text-center fs-5">{hardware.hw_department}</td>
            </tr>
            <tr>
              <th className="text-center">Spec</th>
              <td className="text-center fs-5">{hardware.hw_spec}</td>
            </tr>
            <tr>
              <th className="text-center">Serial Number</th>
              <td className="text-center fs-5">{hardware.hw_serialnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Software Install</th>
              <td className="text-center fs-5">{hardware.softwareinstall}</td>
            </tr>
            <tr>
              <th className="text-center">Price</th>
              <td className="text-center fs-5">
                {hardware.hw_price !== undefined && hardware.hw_price !== null
                  ? hardware.hw_price.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <th className="text-center">Receive Date</th>
              <td className="text-center fs-5">
                {new Date(hardware.hw_receivedate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Invoice Number</th>
              <td className="text-center fs-5">{hardware.hw_invoicenumber}</td>
            </tr>
            <tr>
              <th className="text-center">PO Number</th>
              <td className="text-center fs-5">{hardware.hw_ponumber}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
          <Link
            to={`/dashboard/updatehwasset/${hardware.id}`}
            className="btn btnedit btn-lg me-3"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(hardware.id)}
            className="btn btndelete btn-lg me-3"
          >
            Delete
          </button>
          <Link to="/dashboard/hwasset" className="btn btndetail btn-lg">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadHardware;
