import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateSwasset() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/readsw-asset/` + id)
      .then((res) => {
        console.log(res);
        setSwasset({
          ...swasset,
          swassetnumber: res.data[0]. swassetnumber,
          name: res.data[0].name,
          serialnumber: res.data[0].serialnumber,
          softwarekey: res.data[0].softwarekey,
          user: res.data[0].user,
          location: res.data[0].location,
          price: res.data[0].price,
          receivedate: res.data[0].receivedate,
          invoicenumber: res.data[0].invoicenumber,
          ponumber: res.data[0].ponumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [swasset, setSwasset] = useState({
    swassetnumber: "",
    name: "",
    serialnumber: "",
    softwarekey: "",
    user: "",
    location: "",
    price: "",
    receivedate: "",
    invoicenumber: "",
    ponumber: "",
  });

  //update
  const handleUpdate = (event) => {
    event.preventDefault();
    const requiredFields = [
      `swassetnumber`,
      `name`,
      `serialnumber`,
      `softwarekey`,
      `user`,
      `location`,
      `price`,
      `receivedate`,
      `invoicenumber`,
      `ponumber`,
    ];
    for (const field of requiredFields) {
      if (!swasset[field] && swasset[field] !== 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${field} is required.`,
        });
        return;
      }
    }
    for (const field in swasset) {
      if (swasset.hasOwnProperty(field) && swasset[field] === null) {
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
          .put(`${process.env.REACT_APP_API_URL}/updatesw-asset/` + id, swasset)
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
                navigate("/dashboard/readswasset/" + id, swasset);
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
      setSwasset((prev) => ({
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border borderc bg-white">
        <h2 className="text-center">Update Softwere Asset</h2>
        <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
            <label for="inputAssetNumber" className="form-label fs-5">
              Software Asset Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 borderc"
              id="inputAssetNumber"
              placeholder="Enter Asset Number"
              value={swasset.swassetnumber}
              onChange={(e) =>
                setSwasset({ ...swasset, swassetnumber: e.target.value })
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
              value={swasset.name}
              onChange={(e) => setSwasset({ ...swasset, name: e.target.value })}
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
                value={swasset.serialnumber}
                onChange={(e) =>
                  setSwasset({ ...swasset, serialnumber: e.target.value })
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
                value={swasset.softwarekey}
                onChange={(e) =>
                  setSwasset({ ...swasset, softwarekey: e.target.value })
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
                value={swasset.user}
                onChange={(e) =>
                  setSwasset({ ...swasset, user: e.target.value })
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
              value={swasset.location}
              onChange={(e) =>
                setSwasset({ ...swasset, location: e.target.value })
              }
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
              value={swasset.price === 0 ? "" : swasset.price}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue !== "") {
                  const numericValue = parseFloat(inputValue.replace(/,/g, ""));
                  setSwasset({
                    ...swasset,
                    price: isNaN(numericValue) ? "" : numericValue,
                  });
                } else {
                  setSwasset({
                    ...swasset,
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
                selected={swasset.receivedate}
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
              value={swasset.invoicenumber}
              onChange={(e) =>
                setSwasset({ ...swasset, invoicenumber: e.target.value })
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
              value={swasset.ponumber}
              onChange={(e) =>
                setSwasset({ ...swasset, ponumber: e.target.value })
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

export default UpdateSwasset;
