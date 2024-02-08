import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddAccessories() {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState({
    type: "",
    detail: "",
    serialnumber: "",
    assetinstall: "",
    location: "",
    price: "",
    receivedate: "",
    invoicenum: "",
    ponum: "",
  });

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setAccessories((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `type`,
      `detail`,
      `serialnumber`,
      `assetinstall`,
      `location`,
      `price`,
      `receivedate`,
      `invoicenum`,
      `ponum`,
    ];
    for (const field of requiredFields) {
      if (!accessories[field] && accessories[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in accessories) {
      if (accessories.hasOwnProperty(field) && accessories[field] === null) {
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
          .post(
            `${process.env.REACT_APP_API_URL}/addhw-accessories`,
            accessories
          )
          .then((res) => {
            Swal.fire("Add!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/acessories");
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Add Asset</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Asset Type
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetType"
              placeholder="Enter Asset Type"
              onChange={(e) =>
                setAccessories({ ...accessories, type: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Asset Detail
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetDetail"
              placeholder="Enter Asset Detail"
              onChange={(e) =>
                setAccessories({ ...accessories, detail: e.target.value })
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
              id="inputSerialNumber"
              placeholder="Enter Serial Number"
              onChange={(e) =>
                setAccessories({ ...accessories, serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Asset Install
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetInstall"
              placeholder="Enter Asset Install"
              onChange={(e) =>
                setAccessories({ ...accessories, assetinstall: e.target.value })
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
                setAccessories({ ...accessories, location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Price
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                setAccessories({
                  ...accessories,
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
                selected={accessories.receivedate}
                onChange={handleDateChange}
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholderText="Enter Receive Date"
                dateFormat="dd/MM/yyyy"
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
                setAccessories({ ...accessories, invoicenum: e.target.value })
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
                setAccessories({ ...accessories, ponum: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAccessories;
