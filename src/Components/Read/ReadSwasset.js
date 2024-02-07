import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadSwasset() {
    const { id } = useParams();
    const [swasset, setSwasset] = useState([]);
    const navigate = useNavigate();
  
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
            Swal.fire({
              icon: "error",
              title: "Authentication Failed",
              text: "Please login again",
              showCancelButton: false,
              confirmButtonText: "Back to Login",
              allowOutsideClick: false, 
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location = "/";
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
  
    useEffect(() => {
      checkToken();
      axios
        .get(`${process.env.REACT_APP_API_URL}/readsw-asset/` + id)
        .then((res) => {
          console.log(res);
          setSwasset(res.data[0]);
        })
        .catch((err) => console.log(err));
    }, []);
  
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
          axios.delete(`${process.env.REACT_APP_API_URL}/deletesw-asset/` + id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate("/dashboard/addswasset");
        } else {
        }
      });
    };
  
    return (
      <div className="container px-5 mt-3">
        <div className="d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
          <h3 className="display-4">Asset Detail</h3>
        </div>
        <div className="mt-3">
          <table className="table table-bordered table-striped table-lg" style={{ borderColor: '#007bff' }}>
            <tbody>
              <tr>
                <th className="text-center">Asset ID</th>
                <td className="text-center fs-5">{swasset.assetnum}</td>
              </tr>
              <tr>
                <th className="text-center">Softwere Name</th>
                <td className="text-center fs-5">{swasset.name}</td>
              </tr>
              <tr>
                <th className="text-center">Softwere Key</th>
                <td className="text-center fs-5">{swasset.swkey}</td>
              </tr>
              <tr>
                <th className="text-center">User</th>
                <td className="text-center fs-5">{swasset.user}</td>
              </tr>
              <tr>
                <th className="text-center">Asset Install</th>
                <td className="text-center fs-5">{swasset.assetinstall}</td>
              </tr>
              <tr>
                <th className="text-center">Location</th>
                <td className="text-center fs-5">{swasset.location}</td>
              </tr>
              <tr>
                <th className="text-center">Price</th>
                <td className="text-center fs-5">{swasset.price ? swasset.price.toLocaleString() : ''}</td>
              </tr>
              <tr>
                <th className="text-center">Receive Date</th>
                <td className="text-center fs-5">{swasset.receivedate}</td>
              </tr>
              <tr>
                <th className="text-center">Invoice Number</th>
                <td className="text-center fs-5">{swasset.invoicenum}</td>
              </tr>
              <tr>
                <th className="text-center">PO Number</th>
                <td className="text-center fs-5">{swasset.ponum}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Link to={`/dashboard/updateswasset/${swasset.id}`} className="btn btnedit btn-lg me-3">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(swasset.id)}
              className="btn btndelete btn-lg me-3"
            >
              Delete
            </button>
            <Link to="/dashboard/swasset" className="btn btndetail btn-lg">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
  

export default ReadSwasset