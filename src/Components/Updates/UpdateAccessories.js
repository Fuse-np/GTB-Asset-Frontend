import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import './style.css'

function UpdateAccessories() {
    const { id } = useParams();
    const navigate = useNavigate();
  
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
      axios
        .get(`${process.env.REACT_APP_API_URL}/readhw-accessories/` + id)
        .then((res) => {
          console.log(res);
          setAccessories({
            ...accessories,
            type: res.data[0].type,
            detail: res.data[0].detail,
            sn: res.data[0].sn,
            assetinstall: res.data[0].assetinstall,
            location: res.data[0].location,
            price: res.data[0].price,
            receivedate: res.data[0].receivedate,
            invoicenum: res.data[0].invoicenum,
            ponum: res.data[0].ponum,
          });
        })
        .catch((err) => console.log(err));
    }, []);
  
    const [accessories, setAccessories] = useState({
      type: "",
      detail: "",
      sn: "",
      assetinstall: "",
      location: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
    });
  
    const handleUpdate = (event) => {
      event.preventDefault();
      const requiredFields = [
        `type`, `detail`, `sn`, `assetinstall`, `location`, `price`, `receivedate`, `invoicenum`, `ponum`
      ];
      for (const field of requiredFields) {
        if (!accessories[field] && accessories[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in accessories) {
        if (accessories.hasOwnProperty(field) && accessories[field] === null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} cannot be null.`,
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
          axios.put(`${process.env.REACT_APP_API_URL}/updatehw-accessories/` + id, accessories)
            .then((res) => {
              Swal.fire("Updated!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/readacessories/" + id, accessories);
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
  
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border borderc bg-white">
          <h2 className="text-center">Update Asset</h2>
          <form className="row g-1" onSubmit={handleUpdate}>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Asset Type
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetType"
                placeholder="Enter Asset Type"
                value={accessories.type}
                onChange={(e) =>
                    setAccessories({ ...accessories, type: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Asset Detail
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetDetail"
                placeholder="Enter Asset Detail"
                value={accessories.detail}
                onChange={(e) =>
                    setAccessories({ ...accessories, detail: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Serial Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSerialNumber"
                placeholder="Enter Serial Number"
                value={accessories.sn}
                onChange={(e) =>
                    setAccessories({ ...accessories, sn: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Asset Install (Asset ID)
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetInstall"
                placeholder="Enter Asset Install"
                value={accessories.assetinstall}
                onChange={(e) =>
                    setAccessories({ ...accessories, assetinstall: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Location
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputLocation"
                placeholder="Enter Location"
                value={accessories.location}
                onChange={(e) =>
                    setAccessories({ ...accessories, location: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Price
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPrice"
                placeholder="Enter Price"
                value={accessories.price}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = parseFloat(inputValue.replace(/,/g, '')); 
                  setAccessories({ ...accessories, price: isNaN(numericValue) ? '' : numericValue });
              }}
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Recieve Date
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholder="Enter Receive Date"
                value={accessories.receivedate}
                onChange={(e) =>
                    setAccessories({ ...accessories, receivedate: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Invoid Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputInvoiceNumber"
                placeholder="Enter Invoice Number"
                value={accessories.invoicenum}
                onChange={(e) =>
                    setAccessories({ ...accessories, invoicenum: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                PO Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPONumber"
                placeholder="Enter PO Number"
                value={accessories.ponum}
                onChange={(e) =>
                    setAccessories({ ...accessories, ponum: e.target.value })
                }
              />
            </div>
            <p></p>
            <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
              Update Asset Data
            </button>
          </form>
        </div>
      </div>
    );
  }

export default UpdateAccessories