import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddAmortized() {
  const navigate = useNavigate();
  const [amortzied, setAmortzied] = useState({
    hwassetnumber: "",
    brand: "-",
    model: "-",
    user: "-",
    location: "-",
    dev: "-",
    spec: "-",
    serialnumber: "-",
    price: "0",
    receivedate: new Date(),
    invoicenumber: "-",
    ponumber: "-",
    amortizeddate: new Date(),
  });

  //date
  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setAmortzied((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };

  //date
  const handleDateChange2 = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setAmortzied((prev) => ({
        ...prev,
        amortizeddate: formattedDate,
      }));
    }
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "hwassetnumber",
      "brand",
      "model",
      "user",
      "location",
      "dev",
      "spec",
      "serialnumber",
      "price",
      "receivedate",
      "invoicenumber",
      "ponumber",
      `amortizeddate`,
    ];
    for (const field of requiredFields) {
      if (!amortzied[field] && amortzied[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in amortzied) {
      if (amortzied.hasOwnProperty(field) && amortzied[field] === null) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} cannot be null.`,
        });
        return;
      }
    }
    Swal.fire({
      title: `Confirm Add ${amortzied.hwassetnumber}?`,
      showCancelButton: true,
      confirmButtonText: "Add",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/addhw-amortized`, amortzied)
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number ${amortzied.hwassetnumber} already exists.`,
              });
            } else if (res.data.status === "errorhardware") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number ${amortzied.hwassetnumber} already exists in Hardware asset.`,
              });
            } else {
              Swal.fire("Add!", "", "success").then(() => {
                console.log(res);
                navigate("/dashboard/amortized");
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
        <h2 className="text-center">Add Amortied Asset</h2>
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputAmortiedDate" className="form-label fs-5">
                Amortied Date
              </label>
              <DatePicker
                selected={amortzied.amortizeddate}
                onChange={handleDateChange2}
                className="form-control rounded-0 borderc"
                id="inputAmortiedDate"
                placeholderText="Enter Amortied Date"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Hardware Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetID"
              placeholder="Enter AssetID"
              onChange={(e) =>
                setAmortzied({ ...amortzied, hwassetnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Brand
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputBrand"
              placeholder="Enter Brand"
              value={amortzied.brand}
              onChange={(e) =>
                setAmortzied({ ...amortzied, brand: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Model
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputModel"
              placeholder="Enter Model"
              value={amortzied.model}
              onChange={(e) =>
                setAmortzied({ ...amortzied, model: e.target.value })
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
              value={amortzied.user}
              onChange={(e) =>
                setAmortzied({ ...amortzied, user: e.target.value })
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
              value={amortzied.location}
              onChange={(e) =>
                setAmortzied({ ...amortzied, location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputDev" className="form-label fs-5">
              Dev
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputDev"
              placeholder="Enter Dev"
              value={amortzied.dev}
              onChange={(e) =>
                setAmortzied({ ...amortzied, dev: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Spec
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSpec"
              placeholder="Enter Spec"
              value={amortzied.spec}
              onChange={(e) =>
                setAmortzied({ ...amortzied, spec: e.target.value })
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
              value={amortzied.serialnumber}
              onChange={(e) =>
                setAmortzied({ ...amortzied, serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPrice" className="form-label fs-5">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={amortzied.price === 0 ? "" : amortzied.price}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue !== "") {
                  const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                  setAmortzied({
                    ...amortzied,
                    price: isNaN(numericValue) ? "" : numericValue,
                  });
                } else {
                  setAmortzied({
                    ...amortzied,
                    price: "",
                  });
                }
              }}
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={amortzied.receivedate}
                onChange={handleDateChange}
                className="form-control rounded-0 borderc"
                id="inputAmortiedDate"
                placeholderText="Enter Amortied Date"
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
              value={amortzied.invoicenumber}
              onChange={(e) =>
                setAmortzied({ ...amortzied, invoicenumber: e.target.value })
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
              value={amortzied.ponumber}
              onChange={(e) =>
                setAmortzied({ ...amortzied, ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add Amortzied Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAmortized;
