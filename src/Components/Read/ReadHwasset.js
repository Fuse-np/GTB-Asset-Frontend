import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadHwasset() {
    const { id } = useParams();
    const [hwasset, setHwasset] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/readhw-asset/` + id)
        .then((res) => {
          console.log(res);
          setHwasset(res.data[0]);
        })
        .catch((err) => console.log(err));
    }, []);
  
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
          axios.delete(`${process.env.REACT_APP_API_URL}/deletehw-asset/` + id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate("/dashboard/addhwasset");
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
          <table
            className="table table-bordered table-striped table-lg"
            style={{ borderColor: "#007bff" }}
          >
            <tbody>
              <tr>
                <th className="text-center">Asset ID</th>
                <td className="text-center fs-5">{hwasset.assetnum}</td>
              </tr>
              <tr>
                <th className="text-center">Brand</th>
                <td className="text-center fs-5">{hwasset.brand}</td>
              </tr>
              <tr>
                <th className="text-center">Model</th>
                <td className="text-center fs-5">{hwasset.model}</td>
              </tr>
              <tr>
                <th className="text-center">User</th>
                <td className="text-center fs-5">{hwasset.user}</td>
              </tr>
              <tr>
                <th className="text-center">Location</th>
                <td className="text-center fs-5">{hwasset.location}</td>
              </tr>
              <tr>
                <th className="text-center">Dev</th>
                <td className="text-center fs-5">{hwasset.dev}</td>
              </tr>
              <tr>
                <th className="text-center">Spec</th>
                <td className="text-center fs-5">{hwasset.spec}</td>
              </tr>
              <tr>
                <th className="text-center">Serial Number</th>
                <td className="text-center fs-5">{hwasset.serialnumber}</td>
              </tr>
              <tr>
                <th className="text-center">Software Install</th>
                <td className="text-center fs-5">{hwasset.software}</td>
              </tr>
              <tr>
                <th className="text-center">Price</th>
                <td className="text-center fs-5">{hwasset.price !== undefined && hwasset.price !== null ? hwasset.price.toLocaleString() : '0'}</td>
              </tr>
              <tr>
                <th className="text-center">Receive Date</th>
                <td className="text-center fs-5">{new Date(hwasset.receivedate).toLocaleDateString('en-GB')}</td>
              </tr>
              <tr>
                <th className="text-center">Invoice Number</th>
                <td className="text-center fs-5">{hwasset.invoicenum}</td>
              </tr>
              <tr>
                <th className="text-center">PO Number</th>
                <td className="text-center fs-5">{hwasset.ponum}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Link
              to={`/dashboard/updatehwasset/${hwasset.id}`}
              className="btn btnedit btn-lg me-3"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(hwasset.id)}
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

export default ReadHwasset