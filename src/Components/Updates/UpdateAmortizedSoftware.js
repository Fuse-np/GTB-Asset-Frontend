import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateAmortizedSoftware() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/read-software/` + id)
      .then((res) => {
        console.log(res);
        setSoftware({
          ...software,
          sw_amortizeddate:res.data[0].sw_amortizeddate,
          sw_assetnumber: res.data[0].sw_assetnumber,
          sw_name: res.data[0].sw_name,
          sw_serialnumber: res.data[0].sw_serialnumber,
          sw_softwarekey: res.data[0].sw_softwarekey,
          sw_user: res.data[0].sw_user,
          sw_location: res.data[0].sw_location,
          sw_price: res.data[0].sw_price,
          sw_receivedate: res.data[0].sw_receivedate,
          sw_invoicenumber: res.data[0].sw_invoicenumber,
          sw_ponumber: res.data[0].sw_ponumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [software, setSoftware] = useState({
    sw_amortizeddate: "",
    sw_swassetnumber: "",
    sw_name: "",
    sw_serialnumber: "",
    sw_softwarekey: "",
    sw_user: "",
    sw_location: "",
    sw_price: "",
    sw_receivedate: "",
    sw_invoicenumber: "",
    sw_ponumber: "",
  });

  //update
  const handleUpdate = (event) => {
    event.preventDefault();
    const requiredFields = [
      `sw_amortizeddate`,
      `sw_assetnumber`,
      `sw_name`,
      `sw_serialnumber`,
      `sw_softwarekey`,
      `sw_user`,
      `sw_location`,
      `sw_price`,
      `sw_receivedate`,
      `sw_invoicenumber`,
      `sw_ponumber`,
    ];
    for (const field of requiredFields) {
      if (!software[field] && software[field] !== 0) {
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
            `${process.env.REACT_APP_API_URL}/update-amortizedoftware/` + id,
            software
          )
          .then((res) => {
            if (res.data.status === "error") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Asset number already exists.`,
              });
            } else {
              Swal.fire("Updated!", "", "success").then(() => {
                console.log(res);
                navigate("/dashboard/read-amortizedoftware/" + id, software);
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
      setSoftware((prev) => ({
        ...prev,
        sw_receivedate: formattedDate,
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
      setSoftware((prev) => ({
        ...prev,
        sw_receivedate: formattedDate,
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Softwere Asset</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Amortized Date
              </label>
              <DatePicker
                selected={software.sw_amortizeddate}
                onChange={handleDateChange2}
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholderText="Enter Receive Date"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
              Software Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              value={software.sw_assetnumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_assetnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSoftwereName" className="form-label fs-5">
              Softwere Name
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereName"
              placeholder="Enter Softwere Name"
              value={software.sw_name}
              onChange={(e) =>
                setSoftware({ ...software, sw_name: e.target.value })
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
              value={software.sw_serialnumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_serialnumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSoftwereKey" className="form-label fs-5">
              Softwere Key
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputSoftwereKey"
              placeholder="Enter Softwere Key"
              value={software.sw_softwarekey}
              onChange={(e) =>
                setSoftware({ ...software, sw_softwarekey: e.target.value })
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
              value={software.sw_user}
              onChange={(e) =>
                setSoftware({ ...software, sw_user: e.target.value })
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
              value={software.sw_location}
              onChange={(e) =>
                setSoftware({ ...software, sw_location: e.target.value })
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
              value={software.sw_price}
              onChange={(e) =>
                setSoftware({ ...software, sw_price: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <label htmlFor="inputReceiveDate" className="form-label fs-5">
                Receive Date
              </label>
              <DatePicker
                selected={software.sw_receivedate}
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
              value={software.sw_invoicenumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_invoicenumber: e.target.value })
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
              value={software.sw_ponumber}
              onChange={(e) =>
                setSoftware({ ...software, sw_ponumber: e.target.value })
              }
            />
          </div>
          <p></p>
          <button className="btn btn-success w-100 rounded-0 mb-2 borderc">
            Update Softwere Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAmortizedSoftware;
