import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import './style.css'

function UpdateSwasset() {
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
        .get(`${process.env.REACT_APP_API_URL}/readsw-asset/` + id)
        .then((res) => {
          console.log(res);
          setSwasset({
            ...swasset,
            assetnum: res.data[0].assetnum,
            name: res.data[0].name,
            swkey: res.data[0].swkey,
            user: res.data[0].user,
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
  
    const handleUpdate = (event) => {
      event.preventDefault();
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
        title: "Confirm Update Data?",
        showCancelButton: true,
        confirmButtonText: "Update",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${process.env.REACT_APP_API_URL}/updatesw-asset/` + id, swasset)
            .then((res) => {
              Swal.fire("Updated!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/readswasset/" + id, swasset);
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
          <h2 className="text-center">Update Softwere Asset</h2>
          <form className="row g-1" onSubmit={handleUpdate}>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Asset ID
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetID"
                placeholder="Enter Asset ID"
                value={swasset.assetnum}
                onChange={(e) =>
                  setSwasset({ ...swasset, assetnum: e.target.value })
                }
              />
            </div>
  
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Softwere Name
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwereName"
                placeholder="Enter Softwere Name"
                value={swasset.name}
                onChange={(e) => setSwasset({ ...swasset, name: e.target.value })}
              />
              <div className="col-12">
              <label for="inputAmortizedDate" className="form-label fs-5">
                  Softwere Key
                </label>
                <input
                  type="text"
                  className="form-control rounded-0 borderc"
                  id="inputSoftwereKey"
                  placeholder="Enter Softwere Key"
                  value={swasset.swkey}
                  onChange={(e) =>
                    setSwasset({ ...swasset, swkey: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
              <label for="inputAmortizedDate" className="form-label fs-5">
                  User
                </label>
                <input
                  type="text"
                  className="form-control rounded-0 borderc"
                  id="inputUser"
                  placeholder="Enter User"
                  value={swasset.user}
                  onChange={(e) =>
                    setSwasset({ ...swasset, user: e.target.value })
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
                  id="inputAssetInstal"
                  placeholder="Enter Asset Instal"
                  value={swasset.assetinstall}
                  onChange={(e) =>
                    setSwasset({ ...swasset, assetinstall: e.target.value })
                  }
                />
              </div>
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
                value={swasset.location}
                onChange={(e) =>
                  setSwasset({ ...swasset, location: e.target.value })
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
                value={swasset.price}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = parseFloat(inputValue.replace(/,/g, '')); 
                  setSwasset({ ...swasset, price: isNaN(numericValue) ? '' : numericValue });
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
                value={swasset.receivedate}
                onChange={(e) =>
                  setSwasset({ ...swasset, receivedate: e.target.value })
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
                value={swasset.invoicenum}
                onChange={(e) =>
                  setSwasset({ ...swasset, invoicenum: e.target.value })
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
                value={swasset.ponum}
                onChange={(e) =>
                  setSwasset({ ...swasset, ponum: e.target.value })
                }
              />
            </div>
            <p></p>
            <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
              Update Softwere Data
            </button>
          </form>
        </div>
      </div>
    );
  }
  
export default UpdateSwasset