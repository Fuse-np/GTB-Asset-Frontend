import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateHwasset() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/readhw-asset/` + id)
      .then((res) => {
        console.log(res);
        setHwasset({
          ...hwasset,
          assetnum: res.data[0].assetnum,
          brand: res.data[0].brand,
          model: res.data[0].model,
          user: res.data[0].user,
          location: res.data[0].location,
          dev: res.data[0].dev,
          spec: res.data[0].spec,
          serialnumber: res.data[0].serialnumber,
          software: res.data[0].software,
          price: res.data[0].price,
          receivedate: res.data[0].receivedate,
          invoicenum: res.data[0].invoicenum,
          ponum: res.data[0].ponum,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [hwasset, setHwasset] = useState({
    assetnum: "",
    brand: "",
    model: "",
    user: "",
    location: "",
    dev: "",
    spec: "",
    serialnumber: "",
    software: "",
    price: "",
    receivedate: new Date(),
    invoicenum: "",
    ponum: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    const requiredFields = [
      "assetnum",
      "brand",
      "model",
      "user",
      "location",
      "dev",
      "spec",
      "serialnumber",
      "software",
      "price",
      "receivedate",
      "invoicenum",
      "ponum",
    ];
    for (const field of requiredFields) {
      if (!hwasset[field] && hwasset[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in hwasset) {
      if (hwasset.hasOwnProperty(field) && hwasset[field] === null) {
        Swal.fire({
          icon: "error",
          title: "Error",
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
        axios
          .put(`${process.env.REACT_APP_API_URL}/updatehw-asset/` + id, hwasset)
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number already exists.`,
              });
            } else{
            Swal.fire("Updated!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/readhwasset/" + id, hwasset);
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

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setHwasset((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Asset</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
            Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              value={hwasset.assetnum}
              onChange={(e) =>
                setHwasset({ ...hwasset, assetnum: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputBrand" className="form-label fs-5">
              Brand
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputBrand"
              placeholder="Enter Brand"
              value={hwasset.brand}
              onChange={(e) =>
                setHwasset({ ...hwasset, brand: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputModel" className="form-label fs-5">
              Model
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputModel"
              placeholder="Enter Model"
              value={hwasset.model}
              onChange={(e) =>
                setHwasset({ ...hwasset, model: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputUser" className="form-label fs-5">
              User
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputUser"
              placeholder="Enter User"
              value={hwasset.user}
              onChange={(e) => setHwasset({ ...hwasset, user: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputLocation" className="form-label fs-5">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputLocation"
              placeholder="Enter Location"
              value={hwasset.location}
              onChange={(e) =>
                setHwasset({ ...hwasset, location: e.target.value })
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
              value={hwasset.dev}
              onChange={(e) => setHwasset({ ...hwasset, dev: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputSpec" className="form-label fs-5">
              Spec
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSpec"
              placeholder="Enter Spec"
              value={hwasset.spec}
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
              value={hwasset.serialnumber}
              onChange={(e) =>
                setHwasset({ ...hwasset, serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSoftwareinstall" className="form-label fs-5">
              Softwere Install
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwareinstall"
              placeholder="Enter Software install"
              value={hwasset.software}
              onChange={(e) =>
                setHwasset({ ...hwasset, software: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPrice" className="form-label fs-5">
              Price
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={hwasset.price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                setHwasset({
                  ...hwasset,
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
                selected={hwasset.receivedate}
                onChange={handleDateChange}
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholderText="Enter Receive Date"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputInvoiceNumber" className="form-label fs-5">
              Invoid Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputInvoiceNumber"
              placeholder="Enter Invoice Number"
              value={hwasset.invoicenum}
              onChange={(e) =>
                setHwasset({ ...hwasset, invoicenum: e.target.value })
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
              value={hwasset.ponum}
              onChange={(e) =>
                setHwasset({ ...hwasset, ponum: e.target.value })
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
export default UpdateHwasset;
