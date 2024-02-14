import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddSwasset() {
  const navigate = useNavigate();
  const [swasset, setSwasset] = useState({
    assetnum: "",
    name: "",
    serialnumber: "",
    swkey: "",
    user: "",
    assetinstall: "",
    location: "",
    price: "",
    receivedate: new Date(),
    invoicenum: "",
    ponum: "",
  });

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setSwasset((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `assetnum`,
      `name`,
      `serialnumber`,
      `swkey`,
      `user`,
      `assetinstall`,
      `location`,
      `price`,
      `receivedate`,
      `invoicenum`,
      `ponum`,
    ];
    for (const field of requiredFields) {
      if (!swasset[field] && swasset[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in swasset) {
      if (swasset.hasOwnProperty(field) && swasset[field] === null) {
        Swal.fire({
          icon: "error",
          title: "Error",
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
        axios
          .post(`${process.env.REACT_APP_API_URL}/addsw-asset`, swasset)
          .then((res) => {
            if (res.data.status === "error") {
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Add Softwere Asset</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
            Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              onChange={(e) =>
                setSwasset({ ...swasset, assetnum: e.target.value })
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
              onChange={(e) => setSwasset({ ...swasset, name: e.target.value })}
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
              onChange={(e) =>
                setSwasset({ ...swasset, serialnumber: e.target.value })
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
              onChange={(e) =>
                setSwasset({ ...swasset, swkey: e.target.value })
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
              onChange={(e) => setSwasset({ ...swasset, user: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Asset Install
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetInstal"
              placeholder="Enter Asset Install"
              onChange={(e) =>
                setSwasset({ ...swasset, assetinstall: e.target.value })
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
              onChange={(e) =>
                setSwasset({ ...swasset, location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Price (If not have enter 0)
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                setSwasset({
                  ...swasset,
                  price: isNaN(numericValue) ? "" : numericValue,
                });
              }}
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={swasset.receivedate}
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
              Invoid Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputInvoiceNumber"
              placeholder="Enter Invoice Number"
              onChange={(e) =>
                setSwasset({ ...swasset, invoicenum: e.target.value })
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
              onChange={(e) =>
                setSwasset({ ...swasset, ponum: e.target.value })
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

export default AddSwasset;
