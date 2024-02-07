import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from "react-router-dom";
import "./Sidebar.css"
import Sidebar from "./Sidebar";

function PageLayout() {
    return (
        <div className="container-sm-fluid ">
          <div class="row min-vh-100 ">
          <div class="col-2 sticky-top h-50 bg-dark sidebar ">
              <Sidebar />
             </div>
            <div class="col-10 bgPage">
              <Outlet />
            </div>
          </div>
        </div> 
      );
    }

export default PageLayout