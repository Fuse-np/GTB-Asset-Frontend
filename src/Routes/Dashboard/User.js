import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function User() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
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
  
  //delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Data will be delete from Softwere Yearly?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/deletesw-yearly/` + id)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Success",
              text: "Softwere Yearly delete successfully!",
              icon: "success",
              confirmButtonColor: "#28a745",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                axios
                  .get(`${process.env.REACT_APP_API_URL}/sw-yearly`)
                  .then((res) => {
                    setData(res.data);
                    const totalPagesAfterDeletion = Math.ceil(
                      filteredData.length / itemsPerPage
                    );
                    setCurrentPage(
                      Math.min(currentPage, totalPagesAfterDeletion)
                    );
                  })
                  .catch((err) => console.log(err));
              }
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "Failed to delete ",
              icon: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: "#dc3545",
            });
          });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((sw_yearly) =>
    Object.values(sw_yearly).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const reversedData = filteredData.slice().reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = reversedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);
  const maxPaginationLinks = 5;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPaginationLinks / 2)
    );
    const endPage = Math.min(
      totalPageCount,
      startPage + maxPaginationLinks - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPageCount));
    setCurrentPage(newPage);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPageCount);

  const handleClearSearch = () => {
    setSearchTerm("");
  };


  return (
    <div className="container px-5 mt-3">
      <div className="d-flex justify-content-center shadow p-3 mb-3 bg-white rounded">
        <h3 className="text-uppercase display-5">User management</h3>
      </div>
      <Link
        to="/dashboard/adduser"
        className="btn btn-success mb-3 custom-card"
      >
        Add User
      </Link>
      <Link
        onClick={handleClearSearch}
        className="btn btn-danger mb-3 mr-3 custom-card position-end"
      >
        ClearSearch
      </Link>


      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control custom-card"
          placeholder="Search Box"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered custom-table">
          <thead className="bg-primary text-white text-center">
            <tr>
              <th className="text-danger fs-5">Name</th>
              <th className="text-danger fs-5">Role</th>
              <th className="text-danger fs-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentData && currentData.length > 0 ? (
              [
                ...currentData.filter((user) => user.role === "Admin"),
                ...currentData.filter((user) => user.role === "User"),
              ].map((user, index) => (
                <tr key={index}>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/dashboard/updateuser/${user.id}`}
                      className="btn btndetail btn-sm me-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btndelete btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No user available</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" aria-label="First" onClick={goToFirstPage}>
              <span aria-hidden="true">««</span>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => paginate(currentPage - 1)}
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
            >
              <a className="page-link" onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => paginate(currentPage + 1)}
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" aria-label="Last" onClick={goToLastPage}>
              <span aria-hidden="true">»»</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default User;
