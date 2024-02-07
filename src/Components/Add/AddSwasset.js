import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css"
import Swal from "sweetalert2";

function AddSwasset() {
    const navigate = useNavigate();
    const [swasset, setSwasset] = useState({
      assetnum: "",
      name: "",
      swkey: "",
      user: "",
      assetinstall: "",
      location: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        `assetnum`, `name`, `swkey`, `user`, `assetinstall`, `location`, `price`, `receivedate`, `invoicenum`, `ponum`
      ];
      for (const field of requiredFields) {
        if (!swasset[field] && swasset[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in swasset) {
        if (swasset.hasOwnProperty(field) && swasset[field] === null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
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
          axios.post(`${process.env.REACT_APP_API_URL}/addsw-asset`,swasset)
            .then((res) => {
              Swal.fire("Add!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/swasset");
                });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Error updating data on the server.',
              });
            });
        }
      });
    };
  
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
    }, []);
  
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border bg-white borderc">
          <h2 className="text-center">Add Softwere Asset</h2>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
                Asset ID
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetID"
                placeholder="Enter Asset ID"
                onChange={(e) =>
                  setSwasset({ ...swasset, assetnum: e.target.value })
                }
              />
            </div>
  
            <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
                Softwere Name
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwereName"
                placeholder="Enter Softwere Name"
                onChange={(e) => setSwasset({ ...swasset, name: e.target.value })}
              />
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
                  onChange={(e) =>
                    setSwasset({ ...swasset, user: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
              <label for="inputAssetID" className="form-label fs-5">
                  Asset Install (Asset ID)
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
                Price
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPrice"
                placeholder="Enter Price"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = parseFloat(inputValue.replace(/,/g, '')); 
                  setSwasset({ ...swasset, price: isNaN(numericValue) ? '' : numericValue });
              }}
              />
            </div>
            <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
                Recieve Date
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholder="Enter Receive Date"
                onChange={(e) =>
                  setSwasset({ ...swasset,  receivedate: e.target.value })
                }
              />
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

export default AddSwasset