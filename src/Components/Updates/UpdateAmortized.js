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
  const [software, setSoftware] = useState([]);
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
          hw_assetnumber: res.data[0].hw_assetnumber,
          hw_brand: res.data[0].hw_brand,
          hw_model: res.data[0].hw_model,
          hw_user: res.data[0].hw_user,
          hw_location: res.data[0].hw_location,
          hw_department: res.data[0].hw_department,
          hw_spec: res.data[0].hw_spec,
          hw_serialnumber: res.data[0].hw_serialnumber,
          hw_price: res.data[0].hw_price,
          hw_receivedate: res.data[0].hw_receivedate,
          hw_invoicenumber: res.data[0].hw_invoicenumber,
          hw_ponumber: res.data[0].hw_ponumber,
          hw_amortizeddate: res.data[0].hw_amortizeddate,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [amortized, setAmortized] = useState({
    hw_assetnumber: "",
    hw_brand: "",
    hw_model: "",
    hw_user: "",
    hw_location: "",
    hw_department: "",
    hw_spec: "",
    hw_serialnumber: "",
    hw_price: "",
    hw_receivedate: "",
    hw_invoicenumber: "",
    hw_ponumber: "",
    hw_amortizeddate: "",
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
        hw_receivedate: formattedDate,
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
        hw_amortizeddate: formattedDate,
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
      .get(`${process.env.REACT_APP_API_URL}/software-name`)
      .then((res) => {
        console.log(res);
        setSoftware(res.data);
      })
      .catch((err) => console.log(err));
  }
  const mergedOptions = [
    ...options,
    { label: "None Install", value: "None Install" },
    ...software.map((item) => ({
      value: item.sw_assetnumber,
      label: `${item.sw_assetnumber} (${item.sw_name})`,
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
                selected={amortized.hw_amortizeddate}
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
              value={amortized.hw_assetnumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_assetnumber: e.target.value })
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
              value={amortized.hw_brand}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_brand: e.target.value })
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
              value={amortized.hw_model}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_model: e.target.value })
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
              value={amortized.hw_user}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_user: e.target.value })
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
              value={amortized.hw_location}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputDev" className="form-label fs-5">
              Department
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputDev"
              placeholder="Enter Dev"
              value={amortized.hw_department}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_department: e.target.value })
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
              value={amortized.hw_spec}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_spec: e.target.value })
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
              value={amortized.hw_serialnumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_serialnumber: e.target.value })
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
              className="form-control rounded-0 borderc"
              id="inputPrice"
              placeholder="Enter Price"
              value={amortized.hw_price}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={amortized.hw_receivedate}
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
              value={amortized.hw_invoicenumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_invoicenumber: e.target.value })
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
              value={amortized.hw_ponumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_ponumber: e.target.value })
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
