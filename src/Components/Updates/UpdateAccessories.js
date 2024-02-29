import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function UpdateAccessories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assetnumber, setAssetnumber] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

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
          serialnumber: res.data[0].serialnumber,
          assetinstall: res.data[0].assetinstall,
          location: res.data[0].location,
          dev: res.data[0].dev,
          price: res.data[0].price,
          receivedate: res.data[0].receivedate,
          invoicenumber: res.data[0].invoicenumber,
          ponumber: res.data[0].ponumber,
        });
        getAssetnmber();
        setSelectedAsset({
          value: res.data[0].assetinstall,
          label: res.data[0].assetinstall,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [accessories, setAccessories] = useState({
    type: "",
    detail: "",
    serialnumber: "",
    assetinstall: "",
    location: "",
    dev: "",
    price: "",
    receivedate: "",
    invoicenumber: "",
    ponumber: "",
  });

  //update
  const handleUpdate = (event) => {
    event.preventDefault();
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
      title: "Confirm Update Data?",
      showCancelButton: true,
      confirmButtonText: "Update",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/updatehw-accessories/` + id,
            accessories
          )
          .then((res) => {
            Swal.fire("Updated!", "", "success").then(() => {
              console.log(res);
              navigate("/dashboard/readacessories/" + id, accessories);
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
  //assetnum
  const getAssetnmber = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hw-assetnumber`)
      .then((res) => {
        setAssetnumber(res.data);
      })
      .catch((err) => console.log(err));
  };
  //for select
  const handleAssetChange = (selectedOption) => {
    setSelectedAsset(selectedOption);
    setAccessories({ ...accessories, assetinstall: selectedOption.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Accessories</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <label for="inputAssetType" className="form-label fs-5">
              Accessories Type
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
            <label for="inputAssetDetail" className="form-label fs-5">
              Detail
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
            <label for="inputSerialNumber" className="form-label fs-5">
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
          {assetnumber.length > 0 && (
            <div className="col-12">
              <label htmlFor="inputAssetInstall" className="form-label fs-5">
                Asset Install
              </label>
              <Select
                name="AssetInstall"
                id="inputAssetInstall"
                value={selectedAsset}
                onChange={handleAssetChange}
                options={[
                  { value: "Not Install", label: "Not Install" },
                  ...assetnumber.map((asset) => ({
                    value: asset.hwassetnumber,
                    label: asset.hwassetnumber,
                  })),
                ]}
                className="borderc"
              />
            </div>
          )}
          <div className="col-12">
            <label for="inputLocation" className="form-label fs-5">
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
              />
            </div>
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
            <label for="inputPONumber" className="form-label fs-5">
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
            Update Asset Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAccessories;
