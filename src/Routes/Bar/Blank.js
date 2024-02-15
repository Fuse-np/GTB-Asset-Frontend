import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function Blank() {
  useEffect(() => {
    const showAlert = async () => {
      const result = await Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: "Session timed out. Please login again.",
        showCancelButton: false,
        confirmButtonText: "Back to Login",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location = "/";
      }
    };

    showAlert();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bgPage">
      {/* Content of your component */}
    </div>
  );
}

export default Blank;
