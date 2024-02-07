import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css"
import Swal from "sweetalert2";

function AddSwyearly() {
    const navigate = useNavigate();
    const [swyearly, setSwyearly] = useState({
      name: "",
      assetinstall: "",
      expiredate: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        `name`, `assetinstall`, `expiredate`, `price`, `receivedate`, `invoicenum`, `ponum`
      ];
      for (const field of requiredFields) {
        if (!swyearly[field] && swyearly[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in swyearly) {
        if (swyearly.hasOwnProperty(field) && swyearly[field] === null) {
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
          axios.post(`${process.env.REACT_APP_API_URL}/addsw-yearly`, swyearly)
            .then((res) => {
              Swal.fire("Add!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/swyearly");
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
                Softwere Name
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwereName"
                placeholder="Enter Softwere Name"
                onChange={(e) =>
                    setSwyearly({ ...swyearly, name: e.target.value })
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
                    setSwyearly({ ...swyearly, assetinstall: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
                Expiredate
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputExpiredate"
                placeholder="Enter Expiredate"
                onChange={(e) =>
                    setSwyearly({ ...swyearly, expiredate: e.target.value })
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
                  setSwyearly({ ...swyearly, price: isNaN(numericValue) ? '' : numericValue });
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
                id="inputRecieveDate"
                placeholder="Enter Recieve Date"
                onChange={(e) =>
                    setSwyearly({ ...swyearly, receivedate: e.target.value })
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
                    setSwyearly({ ...swyearly, invoicenum: e.target.value })
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
                    setSwyearly({ ...swyearly, ponum: e.target.value })
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

export default AddSwyearly