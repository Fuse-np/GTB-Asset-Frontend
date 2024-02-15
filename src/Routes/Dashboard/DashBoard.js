import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Swal from "sweetalert2";

function DashBoard() {
  const [hwtotal, setHwtotal] = useState();
  const [accstotal, setAccstotal] = useState();
  const [swtotal, setSwtotal] = useState();
  const [swyeartotal, setSwyeartotal] = useState();
  const [amortizedtotal, setAmortizedtotal] = useState();
  const [hwpricetotal, setHwpricetotal] = useState();
  const [accspricetotal, setAccspricetotal] = useState();
  const [swpricetotal, setSwpricetotal] = useState();
  const [swyearpricetotal, setSwyearpricetotal] = useState();

  useEffect(() => {
    checkToken();
    hwcount();
    accscount();
    swcount();
    swyearcount();
    amortizedcount();
    hwpricecount();
    accspricecount();
    swpricecount();
    swyearpricecount();
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
  const hwcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hwtotal`)
      .then((res) => {
        console.log(res);
        setHwtotal(res.data[0].hw_asset);
      })
      .catch((err) => console.log(err));
  };
  const accscount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accstotal`)
      .then((res) => {
        console.log(res);
        setAccstotal(res.data[0].hw_accessories);
      })
      .catch((err) => console.log(err));
  };
  const swcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/swtotal`)
      .then((res) => {
        console.log(res);
        setSwtotal(res.data[0].sw_asset);
      })
      .catch((err) => console.log(err));
  };
  const swyearcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/swyeartotal`)
      .then((res) => {
        console.log(res);
        setSwyeartotal(res.data[0].sw_yearly);
      })
      .catch((err) => console.log(err));
  };
  const amortizedcount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/amortizedtotal`)
      .then((res) => {
        console.log(res);
        setAmortizedtotal(res.data[0].hw_amortized);
      })
      .catch((err) => console.log(err));
  };

  //Get Price
  const hwpricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hwtotalprice`)
      .then((res) => {
        console.log(res);
        setHwpricetotal(res.data.price);
      })
      .catch((err) => console.log(err));
  };
  const accspricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accstotalprice`)
      .then((res) => {
        console.log(res);
        setAccspricetotal(res.data.price);
      })
      .catch((err) => console.log(err));
  };
  const swpricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/swtotalprice`)
      .then((res) => {
        console.log(res);
        setSwpricetotal(res.data.price);
      })
      .catch((err) => console.log(err));
  };
  const swyearpricecount = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/swyeartotalprice`)
      .then((res) => {
        console.log(res);
        setSwyearpricetotal(res.data.price);
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
    ],
    datasets: [
      {
        data: [hwtotal, accstotal, swtotal, swyeartotal, amortizedtotal],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
                  {Number(hwpricetotal).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-2 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Hardware Accessories</h4>
                <h6 className="card-text">
                  {Number(accspricetotal).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-3 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Software Asset</h4>
                <h6 className="card-text">
                  {Number(swpricetotal).toLocaleString()} Baht
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card custom-border-left-4 shadow h-100 py-2">
              <div className="card-body">
                <h4 className="card-title headtext">Software Yearly</h4>
                <h6 className="card-text">
                  {Number(swyearpricetotal).toLocaleString()} Baht
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
