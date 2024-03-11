import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateYearlySoftware() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      checkToken();
      axios
        .get(`${process.env.REACT_APP_API_URL}/read-yearlysoftware/` + id)
        .then((res) => {
          console.log(res);
          setYearlysoftware({
            ...yearlysoftware,
            ys_name: res.data[0].ys_name,
            ys_serialnumber: res.data[0].ys_serialnumber,
            ys_assetinstall: res.data[0].ys_assetinstall,
            ys_expiredate: res.data[0].ys_expiredate,
            ys_price: res.data[0].ys_price,
            ys_receivedate: res.data[0].ys_receivedate,
            ys_invoicenumber: res.data[0].ys_invoicenumber,
            ys_ponumber: res.data[0].ys_ponumber,
          });
        })
        .catch((err) => console.log(err));
    }, []);
  
    const [yearlysoftware, setYearlysoftware] = useState({
      ys_name: "",
      ys_serialnumber: "",
      ys_assetinstall: "",
      ys_expiredate: "",
      ys_price: "",
      ys_receivedate: "",
      ys_invoicenumber: "",
      ys_ponumber: "",
    });
  
    //update
    const handleUpdate = (event) => {
      event.preventDefault();
      const requiredFields = [
      `ys_name`,
      `ys_serialnumber`,
      `ys_assetinstall`,
      `ys_receivedate`,
      `ys_expiredate`,
      `ys_price`,
      `ys_invoicenumber`,
      `ys_ponumber`
      ];
      for (const field of requiredFields) {
        if (!yearlysoftware[field] && yearlysoftware[field] !== 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${field} is required.`,
          });
          return;
        }
      }
      Swal.fire({
        title: "Confirm Update Data?",
        showCancelButton: true,
        confirmButtonText: "Update",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/update-yearlysoftware/` + id,
              yearlysoftware
            )
            .then((res) => {
              if (res.data.status === "errordate") {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: `Receivedate can't be after expiredate.`,
                });
              } else {
                Swal.fire("Updated!", "", "success").then(() => {
                  console.log(res);
                  navigate("/dashboard/readyearlysoftware/" + id, yearlysoftware);
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
  
    //date
    const handleDateChange = (date) => {
      if (date) {
        const selectedDate = new Date(date);
        selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
        selectedDate.setDate(selectedDate.getDate());
        const formattedDate = selectedDate.toISOString().substring(0, 10);
        setYearlysoftware((prev) => ({
          ...prev,
          ys_receivedate: formattedDate,
        }));
      }
    };
    const handleDateChange2 = (date) => {
      if (date) {
        const selectedDate = new Date(date);
        selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
        selectedDate.setDate(selectedDate.getDate());
        const formattedDate = selectedDate.toISOString().substring(0, 10);
        setYearlysoftware((prev) => ({
          ...prev,
          ys_expiredate: formattedDate,
        }));
      }
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
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border borderc bg-white">
          <h2 className="text-center">Update Softwere Asset</h2>
          <form className="row g-1" onSubmit={handleUpdate}>
            <div className="col-12">
              <label for="inputSoftwereName" className="form-label fs-5">
                Softwere Name
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwereName"
                placeholder="Enter Softwere Name"
                value={yearlysoftware.ys_name}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_name: e.target.value })
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
                value={yearlysoftware.ys_serialnumber}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_serialnumber: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="inputAssetInstall" className="form-label fs-5">
                Asset Install
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetInstall"
                placeholder="Enter Asset Install"
                value={yearlysoftware.ys_assetinstall}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_assetinstall: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <label htmlFor="inputReceiveDate" className="form-label fs-5">
                  Receive Date
                </label>
                <DatePicker
                  selected={yearlysoftware.ys_receivedate}
                  onChange={handleDateChange}
                  className="form-control rounded-0 borderc"
                  id="inputReceiveDate"
                  placeholderText="Enter Receive Date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <label htmlFor="inputExpiredate" className="form-label fs-5">
                  Expiredate
                </label>
                <DatePicker
                  selected={yearlysoftware.ys_expiredate}
                  onChange={handleDateChange2}
                  className="form-control rounded-0 borderc"
                  id="input Expiredate"
                  placeholderText="Enter  Expire Date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
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
                value={yearlysoftware.ys_price}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_price: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="inputInvoiceNumber" className="form-label fs-5">
                Invoice Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputInvoiceNumber"
                placeholder="Enter Invoice Number"
                value={yearlysoftware.ys_invoicenumber}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_invoicenumber: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="inputPONumber" className="form-label fs-5">
                PO Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPONumber"
                placeholder="Enter PO Number"
                value={yearlysoftware.ys_ponumber}
                onChange={(e) =>
                  setYearlysoftware({ ...yearlysoftware, ys_ponumber: e.target.value })
                }
              />
            </div>
            <p></p>
            <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
              Update SoftwereYearly
            </button>
          </form>
        </div>
      </div>
    );
  }
  
export default UpdateYearlySoftware