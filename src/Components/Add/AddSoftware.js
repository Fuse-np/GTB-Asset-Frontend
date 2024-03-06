import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddSoftware() {
  const navigate = useNavigate();
  const [software, setSoftware] = useState({
    sw_assetnumber: "",
    sw_name: "-",
    sw_serialnumber: "-",
    sw_softwarekey: "-",
    sw_user: "-",
    sw_location: "-",
    sw_department: "-",
    sw_price: 0,
    sw_receivedate: new Date(),
    sw_invoicenumber: "-",
    sw_ponumber: "-",
  });

  //date
  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setSoftware((prev) => ({
        ...prev,
        sw_receivedate: formattedDate,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `sw_assetnumber`,
      `sw_name`,
      `sw_serialnumber`,
      `sw_softwarekey`,
      `sw_user`,
      `sw_location`,
      `sw_department`,
      `sw_price`,
      `sw_receivedate`,
      `sw_invoicenumber`,
      `sw_ponumber`,
    ];
    for (const field of requiredFields) {
      if (!software[field] && software[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    Swal.fire({
      title: `Confirm Add ${software.sw_assetnumber}?`,
      showCancelButton: true,
      confirmButtonText: "Add",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/add-software`, software)
          .then((res) => {
            if (res.data.status === "errorsoftware") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number already exists.`,
              });
            } else {
              Swal.fire("Add!", "", "success").then(() => {
                console.log(res);
                navigate("/dashboard/swasset");
              });
            }
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
        <h2 className="text-center">Add Softwere Asset</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputSoftwereAssetNumber" className="form-label fs-5">
              Softwere Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereAssetNumber"
              placeholder="Enter Softwere Asset Number"
              onChange={(e) =>
                setSoftware({ ...software, sw_assetnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Software Name
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereName"
              placeholder="Enter Softwere Name"
              value={software.sw_name}
              onChange={(e) =>
                setSoftware({ ...software, sw_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSerialnumber"
              placeholder="Enter Serialnumber"
              value={software.sw_serialnumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Softwere Key
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereKey"
              placeholder="Enter Softwere Key"
              value={software.sw_softwarekey}
              onChange={(e) =>
                setSoftware({ ...software, sw_softwarekey: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              User
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputUser"
              placeholder="Enter User"
              value={software.sw_user}
              onChange={(e) =>
                setSoftware({ ...software, sw_user: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputLocation"
              placeholder="Enter Location"
              value={software.sw_location}
              onChange={(e) =>
                setSoftware({ ...software, sw_location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputDev" className="form-label fs-5">
              Department
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputDev"
              placeholder="Enter Dev"
              value={software.sw_department}
              onChange={(e) =>
                setSoftware({ ...software, sw_department: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPrice" className="form-label fs-5">
              Price
            </label>
            <input
              type="number"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={software.sw_price}
              onChange={(e) =>
                setSoftware({ ...software, sw_price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={software.sw_receivedate}
                onChange={handleDateChange}
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholderText="Enter Receive Date"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputInvoiceNumber"
              placeholder="Enter Invoice Number"
              value={software.sw_invoicenumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_invoicenumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              PO Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputPONumber"
              placeholder="Enter PO Number"
              value={software.sw_ponumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add Softwere Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSoftware;
