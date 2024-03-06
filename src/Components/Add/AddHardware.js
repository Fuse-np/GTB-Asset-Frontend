import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

function AddHardware() {
  const navigate = useNavigate();
  const [software, setSoftware] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hardware, setHardware] = useState({
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
  });

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

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(selectedDate.getUTCHours() + 7);
      selectedDate.setDate(selectedDate.getDate());
      const formattedDate = selectedDate.toISOString().substring(0, 10);
      setHardware((prev) => ({
        ...prev,
        hw_receivedate: formattedDate,
      }));
    }
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "hw_assetnumber",
      "hw_brand",
      "hw_model",
      "hw_user",
      "hw_location",
      "hw_department",
      "hw_spec",
      "hw_serialnumber",
      "hw_price",
      "hw_receivedate",
      "hw_invoicenumber",
      "hw_ponumber",
    ];
    for (const field of requiredFields) {
      if (!hardware[field] && hardware[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    Swal.fire({
      title: `Confirm Add ${hardware.hw_assetnumber} ?`,
      showCancelButton: true,
      confirmButtonText: "Add",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataToSend = {
          ...hardware,
          hw_softwareinstall: selectedOptions.map((option) => option.value),
        };
        axios
          .post(`${process.env.REACT_APP_API_URL}/add-hardware`, dataToSend)
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number ${hardware.hw_assetnumber} already exists.`,
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
                navigate("/dashboard/hwasset");
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

  //select
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
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
        <h2 className="text-center">Add Hardware Asset</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
              Hardware Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              onChange={(e) =>
                setHardware({ ...hardware, hw_assetnumber: e.target.value })
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
              value={hardware.hw_brand}
              onChange={(e) =>
                setHardware({ ...hardware, hw_brand: e.target.value })
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
              value={hardware.hw_model}
              onChange={(e) =>
                setHardware({ ...hardware, hw_model: e.target.value })
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
              value={hardware.hw_user}
              onChange={(e) => setHardware({ ...hardware, hw_user: e.target.value })}
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
              value={hardware.hw_location}
              onChange={(e) =>
                setHardware({ ...hardware, hw_location: e.target.value })
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
              value={hardware.hw_department}
              onChange={(e) => setHardware({ ...hardware, hw_department: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputAssetID" className="form-label fs-5">
              Spec
            </label>
            <textarea
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSpec"
              placeholder="Enter Spec"
              value={hardware.hw_spec}
              onChange={(e) => setHardware({ ...hardware, hw_spec: e.target.value })}
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
              value={hardware.hw_serialnumber}
              onChange={(e) =>
                setHardware({ ...hardware, hw_serialnumber: e.target.value })
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
              value={hardware.hw_price}
              onChange={(e) =>
                setHardware({ ...hardware, hw_price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={hardware.hw_receivedate}
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
              value={hardware.hw_invoicenumber}
              onChange={(e) =>
                setHardware({ ...hardware, hw_invoicenumber: e.target.value })
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
              value={hardware.hw_ponumber}
              onChange={(e) =>
                setHardware({ ...hardware, hw_ponumber: e.target.value })
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

export default AddHardware;
