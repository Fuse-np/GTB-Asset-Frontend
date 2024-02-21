import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddSwyearly() {
  const navigate = useNavigate();
  const [swyearly, setSwyearly] = useState({
    name: "-",
    serialnumber: "-",
    assetinstall: "-",
    receivedate: new Date(),
    expiredate: new Date(),
    price: "0",
    invoicenumber: "-",
    ponumber: "-",
  });

  //date
  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setSwyearly((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };
  const handleDateChange2 = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setSwyearly((prev) => ({
        ...prev,
        expiredate: formattedDate,
      }));
    }
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `name`,
      `assetinstall`,
      `serialnumber`,
      `expiredate`,
      `price`,
      `receivedate`,
      `invoicenumber`,
      `ponumber`,
    ];
    for (const field of requiredFields) {
      if (!swyearly[field] && swyearly[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in swyearly) {
      if (swyearly.hasOwnProperty(field) && swyearly[field] === null) {
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
          .post(`${process.env.REACT_APP_API_URL}/addsw-yearly`, swyearly)
          .then((res) => {
            Swal.fire("Add!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/swyearly");
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
            <label for="inputAssetID" className="form-label fs-5">
              Software Name
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereName"
              placeholder="Enter Softwere Name"
              value={swyearly.name}
              onChange={(e) =>
                setSwyearly({ ...swyearly, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSerialNumber" className="form-label fs-5">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSerialNumber"
              placeholder="Enter Serial Number"
              value={swyearly.serialnumber}
              onChange={(e) =>
                setSwyearly({ ...swyearly, serialnumber: e.target.value })
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
              value={swyearly.assetinstall}
              onChange={(e) =>
                setSwyearly({ ...swyearly, assetinstall: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={swyearly.receivedate}
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
            <div className="d-flex flex-column">
              <label htmlFor="inputExpiredate" className="form-label fs-5">
                Expiredate
              </label>
              <DatePicker
                selected={swyearly.expiredate}
                onChange={handleDateChange2}
                className="form-control rounded-0 borderc"
                id="input Expiredate"
                placeholderText="Enter  Expire Date"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputPrice" className="form-label fs-5">
              Price
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={swyearly.price === 0 ? "" : swyearly.price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                setSwyearly({
                  ...swyearly,
                  price: isNaN(numericValue) ? "" : numericValue,
                });
              }}
            />
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
              value={swyearly.invoicenumber}
              onChange={(e) =>
                setSwyearly({ ...swyearly, invoicenumber: e.target.value })
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
              value={swyearly.ponumber}
              onChange={(e) =>
                setSwyearly({ ...swyearly, ponumber: e.target.value })
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

export default AddSwyearly;
