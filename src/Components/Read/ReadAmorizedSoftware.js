import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadAmorizedSoftware() {
  const { id } = useParams();
  const [software, setSoftware] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/read-amortizedoftware/` + id)
      .then((res) => {
        console.log(res);
        setSoftware(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Data will be delete from Software Asset",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}/delete-amortizedoftware/` + id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/dashboard/amortizedsoftware");
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
        <h3 className="display-4">Softwere Detail</h3>
      </div>
      <div className="mt-3">
        <table
          className="table table-bordered table-striped table-lg"
          style={{ borderColor: "#007bff" }}
        >
          <tbody>
          <tr>
              <th className="text-center">Amortized Date</th>
              <td className="text-center fs-5">
              {new Date(software.sw_amortizeddate).toLocaleDateString("en-GB")}</td>
            </tr>
            <tr>
              <th className="text-center">Softwere Asset Number</th>
              <td className="text-center fs-5">{software.sw_assetnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Softwere Name</th>
              <td className="text-center fs-5">{software.sw_name}</td>
            </tr>
            <tr>
              <th className="text-center">Asset Install</th>
              <td className="text-center fs-5">{software.pcinstall}</td>
            </tr>
            <tr>
              <th className="text-center">Serial Number</th>
              <td className="text-center fs-5">{software.sw_serialnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Softwere Key</th>
              <td className="text-center fs-5">{software.sw_softwarekey}</td>
            </tr>
            <tr>
              <th className="text-center">User</th>
              <td className="text-center fs-5">{software.sw_user}</td>
            </tr>
            <tr>
              <th className="text-center">Location</th>
              <td className="text-center fs-5">{software.sw_location}</td>
            </tr>
            <tr>
              <th className="text-center">Department</th>
              <td className="text-center fs-5">{software.sw_department}</td>
            </tr>
            <tr>
              <th className="text-center">Price</th>
              <td className="text-center fs-5">
                {software.sw_price !== undefined && software.sw_price !== null
                  ? software.sw_price.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <th className="text-center">Receive Date</th>
              <td className="text-center fs-5">
                {new Date(software.sw_receivedate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Invoice Number</th>
              <td className="text-center fs-5">{software.sw_invoicenumber}</td>
            </tr>
            <tr>
              <th className="text-center">PO Number</th>
              <td className="text-center fs-5">{software.sw_ponumber}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
          <Link
            to={`/dashboard/updateamortizedsoftware/${software.id}`}
            className="btn btnedit btn-lg me-3"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(software.id)}
            className="btn btndelete btn-lg me-3"
          >
            Delete
          </button>
          <Link to="/dashboard/amortizedsoftware" className="btn btndetail btn-lg">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ReadAmorizedSoftware;
