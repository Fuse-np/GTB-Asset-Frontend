import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function AddAmortized() {
  const navigate = useNavigate();
  const [software, setSoftware] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [amortized, setAmortized] = useState({
    hw_assetnumber: "",
    hw_brand: "-",
    hw_model: "-",
    hw_user: "-",
    hw_location: "-",
    hw_department: "-",
    hw_spec: "-",
    hw_serialnumber: "-",
    hw_softwareinstall: "",
    hw_price: 0,
    hw_receivedate: new Date(),
    hw_invoicenumber: "-",
    hw_ponumber: "-",
    hw_amortizeddate: new Date(),
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
  //date
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

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/software-name`)
      .then((res) => {
        console.log(res);
        setSoftware(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      `hw_assetnumber`,
      `hw_brand`,
      `hw_model`,
      `hw_user`,
      `hw_location`,
      `hw_department`,
      `hw_spec`,
      `hw_serialnumber`,
      `hw_price`,
      `hw_receivedate`,
      `hw_invoicenumber`,
      `hw_ponumber`,
      `hw_amortizeddate`,
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
    Swal.fire({
      title: `Confirm Add ${amortized.hw_assetnumber}?`,
      showCancelButton: true,
      confirmButtonText: "Add",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataToSend = {
          ...amortized,
          hw_softwareinstall: selectedOptions.map((option) => option.value),
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/add-amortized`, dataToSend)
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number ${amortized.hw_assetnumber} already exists.`,
              });
            } else if (res.data.status === "errorsoftware") {
              const assetnum = res.data.assetInstall;
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Software already exists in asset number ${assetnum}.`,
              });
            } else {
              Swal.fire("Add!", "", "success").then(() => {
                console.log(res);
                navigate("/dashboard/amortized");
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


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-white borderc">
        <h2 className="text-center">Add Amortied Asset</h2>
        <form className="row g-1 " onSubmit={handleSubmit}>
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
                maxDate={new Date()}
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
              onChange={(e) =>
                setAmortized({ ...amortized, hw_assetnumber: e.target.value })
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
              value={amortized.hw_brand}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_brand: e.target.value })
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
              value={amortized.hw_model}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_model: e.target.value })
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
              value={amortized.hw_user}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_user: e.target.value })
              }
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
              placeholder="Enter Department"
              value={amortized.hw_department}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_department: e.target.value })
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
              value={amortized.hw_spec}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_spec: e.target.value })
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
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              options={[
                { label: 'None Install', value: 'None Install' },
                ...software
                  .filter(
                    (sw) =>
                      !selectedOptions.some(
                        (selectedOption) =>
                          selectedOption.value === sw.sw_assetnumber
                      )
                  )
                  .map((sw) => ({
                    value: sw.sw_assetnumber,
                    label: `${sw.sw_assetnumber} (${sw.sw_name})`,
                  })),
              ]}
              onChange={handleChange}
              value={selectedOptions}
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
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
              value={amortized.hw_invoicenumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_invoicenumber: e.target.value })
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
              value={amortized.hw_ponumber}
              onChange={(e) =>
                setAmortized({ ...amortized, hw_ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Add Amortzied Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAmortized;
