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
          acc_type: res.data[0].acc_type,
          acc_detail: res.data[0].acc_detail,
          acc_serialnumber: res.data[0].acc_serialnumber,
          acc_assetinstall: res.data[0].acc_assetinstall,
          acc_location: res.data[0].acc_location,
          acc_department: res.data[0].acc_department,
          acc_price: res.data[0].acc_price,
          acc_receivedate: res.data[0].acc_receivedate,
          acc_invoicenumber: res.data[0].acc_invoicenumber,
          acc_ponumber: res.data[0].acc_ponumber,
        });
        getAssetnmber();
        setSelectedAsset({
          value: res.data[0].acc_assetinstall,
          label: res.data[0].acc_assetinstall,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [accessories, setAccessories] = useState({
    acc_type: "",
    acc_detail: "",
    acc_serialnumber: "",
    acc_assetinstall: "",
    acc_location: "",
    acc_department: "",
    acc_price: "",
    acc_receivedate: "",
    acc_invoicenumber: "",
    acc_ponumber: "",
  });

  //update
  const handleUpdate = (event) => {
    event.preventDefault();
    const requiredFields = [
      `acc_type`,
      `acc_detail`,
      `acc_serialnumber`,
      `acc_assetinstall`,
      `acc_location`,
      `acc_department`,
      `acc_price`,
      `acc_receivedate`,
      `acc_invoicenumber`,
      `acc_ponumber`,
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
            `${process.env.REACT_APP_API_URL}/update-accessories/` + id,
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
        acc_receivedate: formattedDate,
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
    setAccessories({ ...accessories, acc_assetinstall: selectedOption.value });
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
              value={accessories.acc_type}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_type: e.target.value })
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
              value={accessories.acc_detail}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_detail: e.target.value })
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
              value={accessories.acc_serialnumber}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_serialnumber: e.target.value })
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
                    value: asset.hw_assetnumber,
                    label: asset.hw_assetnumber,
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
              value={accessories.acc_location}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_location: e.target.value })
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
              value={accessories.acc_department}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_department: e.target.value })
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
              value={accessories.acc_price}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={accessories.acc_receivedate}
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
              value={accessories.acc_invoicenumber}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_invoicenumber: e.target.value,
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
              value={accessories.acc_ponumber}
              onChange={(e) =>
                setAccessories({ ...accessories, acc_ponumber: e.target.value })
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
