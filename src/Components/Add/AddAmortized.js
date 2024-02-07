import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import Swal from "sweetalert2";

function AddAmortized() {
    const navigate = useNavigate();
    const [amortzied, setAmortzied] = useState({
      assetnum: "",
      brand: "",
      model: "",
      user: "",
      location: "",
      spec: "",
      sn: "",
      software: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
      amortizeddate: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        `assetnum`, `brand`, `model`, `user`, `location`, `spec`, `sn`, `software`, `price`, `receivedate`, `invoicenum`, `ponum`, `amortizeddate`
      ];
      for (const field of requiredFields) {
        if (!amortzied[field] && amortzied[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in amortzied) {
        if (amortzied.hasOwnProperty(field) && amortzied[field] === null) {
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
          axios.post(`${process.env.REACT_APP_API_URL}/addhw-amortized`, amortzied)
            .then((res) => {
              Swal.fire("Add!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/amortized");
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
          <h2 className="text-center">Add Amortied Asset</h2>
          <form className="row g-1 " onSubmit={handleSubmit}>
            <div className="col-12">
              <label for="inputAssetID" className="form-label fs-5">
                Amortized Date
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAmortizedDate"
                placeholder="Enter Amortized Date"
                value={amortzied.amortizeddate}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, amortizeddate: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="inputAssetID" className="form-label fs-5">
                Asset ID
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetID"
                placeholder="Enter AssetID"
                onChange={(e) =>
                  setAmortzied({ ...amortzied, assetnum: e.target.value })
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
                onChange={(e) =>
                  setAmortzied({ ...amortzied, location: e.target.value })
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
                onChange={(e) =>
                  setAmortzied({ ...amortzied, sn: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label for="inputAssetID" className="form-label fs-5">
                Softwere Install
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwareinstall"
                placeholder="Enter Software install"
                onChange={(e) =>
                  setAmortzied({ ...amortzied, software: e.target.value })
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
                  setAmortzied({ ...amortzied, price: isNaN(numericValue) ? '' : numericValue });
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
                  setAmortzied({ ...amortzied, receivedate: e.target.value })
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
                  setAmortzied({ ...amortzied, invoicenum: e.target.value })
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
                  setAmortzied({ ...amortzied, ponum: e.target.value })
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

export default AddAmortized