import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function AddAccessories() {
  const navigate = useNavigate();
  const [assetnumber, setAssetnumber] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [accessories, setAccessories] = useState({
    type: "-",
    detail: "-",
    serialnumber: "-",
    assetinstall: "",
    location: "-",
    dev: "-",
    price: 0,
    receivedate: new Date(),
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
      setAccessories((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `type`,
      `detail`,
      `serialnumber`,
      `assetinstall`,
      `location`,
      `dev`,
      `price`,
      `receivedate`,
      `invoicenumber`,
      `ponumber`,
    ];
    for (const field of requiredFields) {
      if (!accessories[field] && accessories[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in accessories) {
      if (accessories.hasOwnProperty(field) && accessories[field] === null) {
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
          .post(
            `${process.env.REACT_APP_API_URL}/addhw-accessories`,
            accessories
          )
          .then((res) => {
            Swal.fire("Add!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/acessories");
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
    getAssetnmber();
  }, []);

  const getAssetnmber = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hw-assetnumber`)
      .then((res) => {
        setAssetnumber(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAssetChange = (selectedOption) => {
    setSelectedAsset(selectedOption);
    setAccessories({ ...accessories, assetinstall: selectedOption.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Add Accessories</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="input AccessoriesID" className="form-label fs-5">
              Accessories Type
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="input AccessoriesType"
              placeholder="Enter  Accessories Type"
              value={accessories.type}
              onChange={(e) =>
                setAccessories({ ...accessories, type: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Detail
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetDetail"
              placeholder="Enter Detail"
              value={accessories.detail}
              onChange={(e) =>
                setAccessories({ ...accessories, detail: e.target.value })
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
              id="inputSerialNumber"
              placeholder="Enter Serial Number"
              value={accessories.serialnumber}
              onChange={(e) =>
                setAccessories({ ...accessories, serialnumber: e.target.value })
              }
            />
          </div>
            <div className="col-12">
              <label htmlFor="inputAssetInstall" className="form-label fs-5">
                Asset Install
              </label>
              <Select
                name="AssetInstall"
                id="inputAssetInstall"
                value={selectedAsset || "Not install"}
                onChange={handleAssetChange}
                options={[
                  { value: "Not install", label: "Not install" },
                  ...assetnumber.map((asset) => ({
                    value: asset.hwassetnumber,
                    label: asset.hwassetnumber,
                  })),
                ]}
                className="borderc"
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
              value={accessories.location}
              onChange={(e) =>
                setAccessories({ ...accessories, location: e.target.value })
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
              value={accessories.dev}
              onChange={(e) =>
                setAccessories({ ...accessories, dev: e.target.value })
              }
            />
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
              value={accessories.price}
              onChange={(e) =>
                setAccessories({ ...accessories, price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={accessories.receivedate}
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
            <label for="inputAssetID" className="form-label fs-5">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputInvoiceNumber"
              placeholder="Enter Invoice Number"
              value={accessories.invoicenumber}
              onChange={(e) =>
                setAccessories({
                  ...accessories,
                  invoicenumber: e.target.value,
                })
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
              value={accessories.ponumber}
              onChange={(e) =>
                setAccessories({ ...accessories, ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAccessories;
