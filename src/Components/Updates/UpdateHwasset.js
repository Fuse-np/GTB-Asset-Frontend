import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function UpdateHwasset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [swasset, setSwasset] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    checkToken();
    getSoft();
    axios
      .get(`${process.env.REACT_APP_API_URL}/readhw-asset/` + id)
      .then((res) => {
        console.log(res);
        setHwasset({
          ...hwasset,
          hwassetnumber: res.data[0].hwassetnumber,
          brand: res.data[0].brand,
          model: res.data[0].model, 
          user: res.data[0].user,
          location: res.data[0].location,
          dev: res.data[0].dev,
          spec: res.data[0].spec,
          serialnumber: res.data[0].serialnumber,
          price: res.data[0].price,
          receivedate: res.data[0].receivedate,
          invoicenumber: res.data[0].invoicenumber,
          ponumber: res.data[0].ponumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [hwasset, setHwasset] = useState({
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
  });

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
        const dataToSend = {
          ...hwasset,
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

  //date
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

  //select
  const handleChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
  };

  //fetch software
  async function fetchData() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/hw-softwareinstall/` + id);
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Asset</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
              Hardware Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              value={hwasset.hwassetnumber}
              onChange={(e) =>
                setHwasset({ ...hwasset, hwassetnumber: e.target.value })
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
            <textarea
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
                hwasset.price === ""
                  ? ""
                  : hwasset.price === 0
                  ? "0"
                  : hwasset.price
              }
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue !== "") {
                  const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                  setHwasset({
                    ...hwasset,
                    price: isNaN(numericValue) ? "" : numericValue,
                  });
                } else {
                  setHwasset({
                    ...hwasset,
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
                selected={hwasset.receivedate}
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
            <label for="inputInvoiceNumber" className="form-label fs-5">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputInvoiceNumber"
              placeholder="Enter Invoice Number"
              value={hwasset.invoicenumber}
              onChange={(e) =>
                setHwasset({ ...hwasset, invoicenumber: e.target.value })
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
              value={hwasset.ponumber}
              onChange={(e) =>
                setHwasset({ ...hwasset, ponumber: e.target.value })
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
