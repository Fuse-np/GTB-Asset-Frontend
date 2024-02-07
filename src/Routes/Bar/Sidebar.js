import React from "react";
import { Link } from "react-router-dom";
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css"
import Swal from 'sweetalert2';

function Sidebar() {
    
    const handleLogout = (event) => {
        event.preventDefault();
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout!',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#d33',
          reverseButtons: true,
          allowOutsideClick: false, 
          allowEscapeKey: false,    
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('token');
            window.location = '/';
          }
        });
      };
    
      return (
        <div className="col-auto bg-dark">
          <div className="d-flex flex-column align-items-center justify-content-center px-3 pt-2 text-white min-vh-100">
            <h2>
              <span className="fs-5 fw-bolder d-none d-sm-inline  whitetext">
                Getabec Asset
              </span>
            </h2>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-4 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">DashBoard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/hwasset"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-database-fill ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Hardware Asset</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/acessories"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-database-fill-dash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Accessories</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/swasset"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-card-list ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Software Asset</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/swyearly"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-card-checklist ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Software Yearly</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/amortized"
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-database-fill-x ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">AmortizedAssets</span>
                </Link>
              </li>
              <li className="w-100 mt-auto mb-4">
              <Link
                  onClick={handleLogout}
                  className="nav-link whitetext px-0 align-middle"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    
export default Sidebar