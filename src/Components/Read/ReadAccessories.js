import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadAccessories() {
  const { id } = useParams();
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/readhw-accessories/` + id)
      .then((res) => {
        console.log(res);
        setAccessories(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Data will be delete from Hardware Accessories",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `${process.env.REACT_APP_API_URL}/deletehw-accessories/` + id
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/dashboard/acessories");
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
        <h3 className="display-4">Accessories Detail</h3>
      </div>
      <div className="mt-3">
        <table
          className="table table-bordered table-striped table-lg"
          style={{ borderColor: "#007bff" }}
        >
          <tbody>
            <tr>
              <th className="text-center">Accessories Type</th>
              <td className="text-center fs-5">{accessories.type}</td>
            </tr>
            <tr>
              <th className="text-center">Detail</th>
              <td className="text-center fs-5">{accessories.detail}</td>
            </tr>
            <tr>
              <th className="text-center">Serial Number</th>
              <td className="text-center fs-5">{accessories.serialnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Asset Install</th>
              <td className="text-center fs-5">{accessories.assetinstall}</td>
            </tr>
            <tr>
              <th className="text-center">Location</th>
              <td className="text-center fs-5">{accessories.location}</td>
            </tr>
            <tr>
              <th className="text-center">Dev</th>
              <td className="text-center fs-5">{accessories.dev}</td>
            </tr>
            <tr>
              <th className="text-center">Price</th>
              <td className="text-center fs-5">
                {accessories.price !== undefined && accessories.price !== null
                  ? accessories.price.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <th className="text-center">Receive Date</th>
              <td className="text-center fs-5">
                {new Date(accessories.receivedate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Invoice Number</th>
              <td className="text-center fs-5">{accessories.invoicenumber}</td>
            </tr>
            <tr>
              <th className="text-center">PO Number</th>
              <td className="text-center fs-5">{accessories.ponumber}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <Link
            to={`/dashboard/updateacessories/${accessories.id}`}
            className="btn btnedit btn-lg me-3"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(accessories.id)}
            className="btn btndelete btn-lg me-3"
          >
            Delete
          </button>
          <Link to="/dashboard/acessories" className="btn btndetail btn-lg">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadAccessories;
