import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function UpdateAmortized() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [swasset, setSwasset] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getSoft();
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/readhw-amortized/` + id)
      .then((res) => {
        console.log(res);
        setAmortized({
          ...amortized,
          hwassetnumber: res.data[0].hwassetnumber,
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
          invoicenumber: res.data[0].invoicenumber,
          ponumber: res.data[0].ponumber,
          amortizeddate: res.data[0].amortizeddate,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [amortized, setAmortized] = useState({
    hwassetnumber: "",
    brand: "",
    model: "",
    user: "",
    location: "",
    dev: "",
    spec: "",
    serialnumber: "",
    price: "",
    receivedate: "",
    invoicenumber: "",
    ponumber: "",
    amortizeddate: "",
  });

  //date
  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setAmortized((prev) => ({
        ...prev,
        receivedate: formattedDate,
      }));
    }
  };
  const handleDateChange2 = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setAmortized((prev) => ({
        ...prev,
        amortizeddate: formattedDate,
      }));
    }
  };

  //update
  const handleUpdate = (event) => {
    event.preventDefault();
    const requiredFields = [
      `hwassetnumber`,
      `brand`,
      `model`,
      `user`,
      `location`,
      `dev`,
      `spec`,
      `serialnumber`,
      `price`,
      `receivedate`,
      `invoicenumber`,
      `ponumber`,
      `amortizeddate`,
    ];
    for (const field of requiredFields) {
      if (!amortized[field] && amortized[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in amortized) {
      if (amortized.hasOwnProperty(field) && amortized[field] === null) {
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
        const dataToSend = {
          ...amortized,
          softwareinstall: selectedOption.map((option) => option.value),
        };
        axios
          .put(`${process.env.REACT_APP_API_URL}/updatehw-asset/` + id, dataToSend)
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number already exists.`,
              });
            } else if (res.data.status === "errorsoftware") {
              const assetnum = res.data.assetInstallValue;
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Software already exists in ${assetnum}`,
              });
            } else {
              Swal.fire("Updated!", "", "success").then(() => {
                console.log(res);
                navigate("/dashboard/readhwasset/" + id, amortized);
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

  //fetch software
  async function fetchData() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/hw-softwareinstall/` + id
    );
    const dataString = await response.text();
    const cleanedDataString = dataString.replace(/[\[\]'"]+/g, "");
    const dataArray = cleanedDataString.split(", ");
    return dataArray;
  }
  useEffect(() => {
    fetchData().then((data) => {
      const formattedOptions = data.map((item) => ({
        value: item,
        label: item,
      }));
      setOptions(formattedOptions);
      setSelectedOption(formattedOptions);
    });
  }, []);

  //select
  const handleChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
  };

  //select software
  function getSoft() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sw`)
      .then((res) => {
        console.log(res);
        setSwasset(res.data);
      })
      .catch((err) => console.log(err));
  }
  const mergedOptions = [
    ...options,
    ...swasset.map((item) => ({
      value: item.swassetnumber,
      label: `${item.swassetnumber} (${item.name})`,
    })),
  ];

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Asset</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputAmortiedDate" className="form-label fs-5">
                Amortied Date
              </label>
              <DatePicker
                selected={amortized.amortizeddate}
                onChange={handleDateChange2}
                className="form-control rounded-0 borderc"
                id="inputAmortiedDate"
                placeholderText="Enter Amortied Date"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Hardware Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetID"
              placeholder="Enter AssetID"
              value={amortized.hwassetnumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hwassetnumber: e.target.value })
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
              value={amortized.brand}
              onChange={(e) =>
                setAmortized({ ...amortized, brand: e.target.value })
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
              value={amortized.model}
              onChange={(e) =>
                setAmortized({ ...amortized, model: e.target.value })
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
              value={amortized.user}
              onChange={(e) =>
                setAmortized({ ...amortized, user: e.target.value })
              }
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
              value={amortized.location}
              onChange={(e) =>
                setAmortized({ ...amortized, location: e.target.value })
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
              value={amortized.dev}
              onChange={(e) =>
                setAmortized({ ...amortized, dev: e.target.value })
              }
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
              value={amortized.spec}
              onChange={(e) =>
                setAmortized({ ...amortized, spec: e.target.value })
              }
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
              value={amortized.serialnumber}
              onChange={(e) =>
                setAmortized({ ...amortized, serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSoftwareinstall" className="form-label fs-5">
              Software Install
            </label>
            <Select
              isMulti
              value={selectedOption}
              onChange={handleChange}
              options={mergedOptions}
              defaultValue={options}
            />
          </div>
          <div className="col-12">
            <label for="inputPrice" className="form-label fs-5">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={
                amortized.price === ""
                  ? ""
                  : amortized.price === 0
                  ? "0"
                  : amortized.price
              }
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue !== "") {
                  const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                  setAmortized({
                    ...amortized,
                    price: isNaN(numericValue) ? "" : numericValue,
                  });
                } else {
                  setAmortized({
                    ...amortized,
                    price: "",
                  });
                }
              }}
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={amortized.receivedate}
                onChange={handleDateChange}
                className="form-control rounded-0 borderc"
                id="inputAmortiedDate"
                placeholderText="Enter Amortied Date"
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
              value={amortized.invoicenumber}
              onChange={(e) =>
                setAmortized({ ...amortized, invoicenumber: e.target.value })
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
              value={amortized.ponumber}
              onChange={(e) =>
                setAmortized({ ...amortized, ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Update Amortied Asset Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAmortized;
