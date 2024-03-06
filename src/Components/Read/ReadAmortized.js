import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadAmortized() {
  const { id } = useParams();
  const [amortized, setAmortized] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/read-amortized/` + id)
      .then((res) => {
        console.log(res);
        setAmortized(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Data will be delete from Amortized Asset",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `${process.env.REACT_APP_API_URL}/delete-amortized/` + id
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/dashboard/amortized");
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
        <h3 className="display-4">Amortized Asset Detail</h3>
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
                {new Date(amortized.hw_amortizeddate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Hardware Asset Number</th>
              <td className="text-center fs-5">{amortized.hw_assetnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Brand</th>
              <td className="text-center fs-5">{amortized.hw_brand}</td>
            </tr>
            <tr>
              <th className="text-center">Model</th>
              <td className="text-center fs-5">{amortized.hw_model}</td>
            </tr>
            <tr>
              <th className="text-center">User</th>
              <td className="text-center fs-5">{amortized.hw_user}</td>
            </tr>
            <tr>
              <th className="text-center">Location</th>
              <td className="text-center fs-5">{amortized.hw_location}</td>
            </tr>
            <tr>
              <th className="text-center">Department</th>
              <td className="text-center fs-5">{amortized.hw_department}</td>
            </tr>
            <tr>
              <th className="text-center">Spec</th>
              <td className="text-center fs-5">{amortized.hw_spec}</td>
            </tr>
            <tr>
              <th className="text-center">Serial Number</th>
              <td className="text-center fs-5">{amortized.hw_serialnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Software Install</th>
              <td className="text-center fs-5">{amortized.softwareinstall}</td>
            </tr>
            <tr>
              <th className="text-center">Price</th>
              <td className="text-center fs-5">
                {amortized.hw_price !== undefined && amortized.hw_price !== null
                  ? amortized.hw_price.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <th className="text-center">Receive Date</th>
              <td className="text-center fs-5">
                {new Date(amortized.hw_receivedate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Invoice Number</th>
              <td className="text-center fs-5">{amortized.hw_invoicenumber}</td>
            </tr>
            <tr>
              <th className="text-center">PO Number</th>
              <td className="text-center fs-5">{amortized.hw_ponumber}</td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-end mb-3">
          <Link
            to={`/dashboard/updateamortized/${amortized.id}`}
            className="btn btnedit btn-lg me-3"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(amortized.id)}
            className="btn btndelete btn-lg me-3"
          >
            Delete
          </button>
          <Link to="/dashboard/amortized" className="btn btndetail btn-lg">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadAmortized;
