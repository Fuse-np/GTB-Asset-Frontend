import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";


function DashBoard() {
  const [hardwaretotal, setHardwaretotal] = useState();
  const [accstotal, setAccstotal] = useState();
  const [softwaretotal, setSoftwaretotal] = useState();
  const [yearlysoftwaretotal, setYearlysoftwaretotal] = useState();
  const [amortizedtotal, setAmortizedtotal] = useState();
  const [softwareamortizedtotal, setSoftwareAmortizedtotal] = useState();
  const [hardwareprice, setHardwareprice] = useState();
  const [accsprice, setAccsprice] = useState();
  const [softwareprice, setSoftwareprice] = useState();
  const [yearlysoftwareprice, setYearlysoftwareprice] = useState();

  useEffect(() => {
    checkToken();
    hardwarecount();
    accessoriescount();
    softwarecount();
    yearlysoftwarecount();
    amortizedcount();
    softwareamortizedcount();
    hardwarepricecount();
    accessoriespricecount();
    softwarepricecount();
    yearlysoftwarepricecount();
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

  //Get total
  const hardwarecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hardwaretotal`)
      .then((res) => {
        console.log(res);
        setHardwaretotal(res.data[0].hardware);
      })
      .catch((err) => console.log(err));
  };
  const accessoriescount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accessoriestotal`)
      .then((res) => {
        console.log(res);
        setAccstotal(res.data[0].accessories);
      })
      .catch((err) => console.log(err));
  };
  const softwarecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/softwaretotal`)
      .then((res) => {
        console.log(res);
        setSoftwaretotal(res.data[0].software);
      })
      .catch((err) => console.log(err));
  };
  const yearlysoftwarecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/yearlysoftwaretotal`)
      .then((res) => {
        console.log(res);
        setYearlysoftwaretotal(res.data[0].yearlysoftware);
      })
      .catch((err) => console.log(err));
  };
  const amortizedcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/amortizedtotal`)
      .then((res) => {
        console.log(res);
        setAmortizedtotal(res.data[0].hardware);
      })
      .catch((err) => console.log(err));
  };
  const softwareamortizedcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/amortizedsoftwaretotal`)
      .then((res) => {
        console.log(res);
        setSoftwareAmortizedtotal(res.data[0].software);
      })
      .catch((err) => console.log(err));
  };

  //Get Price
  const hardwarepricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hardwareprice`)
      .then((res) => {
        console.log(res);
        setHardwareprice(res.data.hw_price);
      })
      .catch((err) => console.log(err));
  };
  const accessoriespricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accessoriesprice`)
      .then((res) => {
        console.log(res);
        setAccsprice(res.data.acc_price);
      })
      .catch((err) => console.log(err));
  };
  const softwarepricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/softwareprice`)
      .then((res) => {
        console.log(res);
        setSoftwareprice(res.data.sw_price);
      })
      .catch((err) => console.log(err));
  };
  const yearlysoftwarepricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/yearlysoftwareprice`)
      .then((res) => {
        console.log(res);
        setYearlysoftwareprice(res.data.ys_price);
      })
      .catch((err) => console.log(err));
  };

  const data = {
    labels: [
      "Hardware Asset",
      "Hardware Accessories",
      "Software Asset",
      "Software Yearly",
      "Amortized Asset",
      "Amortized Software"
    ],
    datasets: [
      {
        data: [hardwaretotal, accstotal, softwaretotal, yearlysoftwaretotal, amortizedtotal, softwareamortizedtotal],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        ticks: {
          font: {
            size: 16,
          },
          color: "#2A2827",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Getabec Total Asset",
        font: {
          size: 30,
        },
        color: "#D60C0C",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value, context) => {
          return Number(value).toLocaleString();
        },
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container px-3 mt-4">
      <div className="d-flex justify-content-center shadow p-3 mb-4 bg-white rounded">
        <h4 className="display-5 text-uppercase">Dashboard</h4>
      </div>
      <div className="container mt-3 bg-white rounded">
        <div className="row">
          <div className="col-md-12">
            <div
              className="chart-container"
              style={{
                position: "relative",
                height: "60vh",
                width: "90vw",
                maxWidth: "100%",
              }}
            >
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row mt-3">
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-1 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Hardware Asset</h4>
                <h6 className="card-text">
                  {Number(hardwareprice).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-2 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Hardware Accessories</h4>
                <h6 className="card-text">
                  {Number(accsprice).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-3 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Software Asset</h4>
                <h6 className="card-text">
                  {Number(softwareprice).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-4 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Software Yearly</h4>
                <h6 className="card-text">
                  {Number(yearlysoftwareprice).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
