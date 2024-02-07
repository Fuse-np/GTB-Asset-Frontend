import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import Swal from "sweetalert2";

function AddHwasset() {
    const navigate = useNavigate();
    const [hwasset, setHwasset] = useState({
      assetnum: "",
      brand: "",
      model: "",
      user: "",
      location: "",
      spec: "",
      serialnumber: "",
      software: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        'assetnum', 'brand', 'model', 'user', 'location', 'spec',
        'serialnumber', 'software', 'price', 'receivedate', 'invoicenum', 'ponum'
      ];
      for (const field of requiredFields) {
        if (!hwasset[field] && hwasset[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in hwasset) {
        if (hwasset.hasOwnProperty(field) && hwasset[field] === null) {
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
          axios.post(`${process.env.REACT_APP_API_URL}/addhw-asset`, hwasset) 
            .then((res) => {
              Swal.fire("Add!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/hwasset");
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
        <div className="p-3 rounded w-50 border bg-white borderc">
          <h2 className="text-center">Add Asset</h2>
          <form className="row g-1" onSubmit={handleSubmit}>
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
                  setHwasset({ ...hwasset, assetnum: e.target.value })
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
                  setHwasset({ ...hwasset, brand: e.target.value })
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
                  setHwasset({ ...hwasset, model: e.target.value })
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
                onChange={(e) => setHwasset({ ...hwasset, user: e.target.value })}
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
                  setHwasset({ ...hwasset, location: e.target.value })
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
                onChange={(e) => setHwasset({ ...hwasset, spec: e.target.value })}
              />
            </div>
            <div className="col-12">
            <label for="inputSerialnumber" className="form-label fs-5">
                Serial Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSerialnumber"
                placeholder="Enter Serialnumber"
                onChange={(e) => setHwasset({ ...hwasset, serialnumber: e.target.value })}
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
                  setHwasset({ ...hwasset, software: e.target.value })
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
                  setHwasset({ ...hwasset, price: isNaN(numericValue) ? '' : numericValue });
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
                  setHwasset({ ...hwasset, receivedate: e.target.value })
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
                  setHwasset({ ...hwasset, invoicenum: e.target.value })
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
                  setHwasset({ ...hwasset, ponum: e.target.value })
                }
              />
            </div>
            <p></p>
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add Asset
            </button>
          </form>
        </div>
      </div>
    );
  }

export default AddHwasset