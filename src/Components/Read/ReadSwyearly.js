import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Swal from "sweetalert2";

function ReadSwyearly() {
  const { id } = useParams();
  const [swyearly, setSwyearly] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/readsw-yearly/` + id)
      .then((res) => {
        console.log(res);
        setSwyearly(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Data will be delete from Software Yearly",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}/deletesw-yearly/` + id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/dashboard/swyearly");
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
              <th className="text-center">Softwere Name</th>
              <td className="text-center fs-5">{swyearly.name}</td>
            </tr>
            <tr>
              <th className="text-center">Serial Number</th>
              <td className="text-center fs-5">{swyearly.serialnumber}</td>
            </tr>
            <tr>
              <th className="text-center">Asset Install</th>
              <td className="text-center fs-5">{swyearly.assetinstall}</td>
            </tr>
            <tr>
              <th className="text-center">Receive Date</th>
              <td className="text-center fs-5">
                {new Date(swyearly.receivedate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Expiredate</th>
              <td className="text-center fs-5">
                {new Date(swyearly.expiredate).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th className="text-center">Price</th>
              <td className="text-center fs-5">
                {swyearly.price !== undefined && swyearly.price !== null
                  ? swyearly.price.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <th className="text-center">Invoice Number</th>
              <td className="text-center fs-5">{swyearly.invoicenumber}</td>
            </tr>
            <tr>
              <th className="text-center">PO Number</th>
              <td className="text-center fs-5">{swyearly.ponumber}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <Link
            to={`/dashboard/updateswyearly/${swyearly.id}`}
            className="btn btnedit btn-lg me-3"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(swyearly.id)}
            className="btn btndelete btn-lg me-3"
          >
            Delete
          </button>
          <Link to="/dashboard/swyearly" className="btn btndetail btn-lg">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ReadSwyearly;
