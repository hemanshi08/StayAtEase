import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "./component/header";
import Footer from "../Components/Footer";

const usersData = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    mobile: "+1 888 888 8888",
    lastActivity: "2 mins ago",
    created: "30 Sep 2023",
    status: "Active",
    profile: "../profile.png",
  },
  {
    id: 2,
    name: "John Smith",
    email: "johnsmith@example.com",
    mobile: "518-837-9258",
    lastActivity: "10 mins ago",
    created: "27 Sep 2023",
    status: "Active",
    profile:"../profile.png",
  },
  {
    id: 3,
    name: "Robert",
    email: "robert@example.com",
    mobile: "302-372-7812",
    lastActivity: "Online",
    created: "25 Sep 2023",
    status: "Active",
    profile: "../profile.png",
  },

];

const UserTable = () => {
  const [users] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div>
        <Header/>
    <div className="container mt-4">
      <h2 className="fw-bold">Total Users</h2>
      <div className="d-flex justify-content-end mb-3 position-relative">
        <div className="position-relative w-25">
          <FontAwesomeIcon
            icon={faSearch}
            className="position-absolute"
            style={{ left: "10px", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }}
          />
          <input
            type="text"
            className="form-control ps-4"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table bg-white rounded shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Last Activity</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <TableRow key={user.id} index={(currentPage - 1) * entriesPerPage + index + 1} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Entries Per Page */}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
        <div>
          <label className="me-2">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="form-select d-inline w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="mb-5 px-5">
          <span className="text-muted">
            {currentPage} - {displayedUsers.length} of {filteredUsers.length} items
          </span>
          <button 
            className="btn btn-sm btn-outline-secondary ms-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button 
            className="btn btn-sm btn-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
   
    </div>
    <Footer/>
    </div>
  );
};

const TableRow = ({ index, user }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={user.profile}
            className="rounded-circle me-2"
            alt="User"
            width="40"
            height="40"
          />
          <div>
            <span className="fw-semibold">{user.name}</span>
            <br />
            <small className="text-muted">{user.email}</small>
          </div>
        </div>
      </td>
      <td>{user.mobile}</td>
      <td>{user.lastActivity}</td>
      <td>{user.created}</td>
      <td>
        <span className="badge" style={{ backgroundColor: "#DFF6DD", color: "#388E3C" }}>{user.status}</span>
      </td>
      <td>
        <FontAwesomeIcon
          icon={faEdit}
          className="text-primary me-2 cursor-pointer"
        />
        <FontAwesomeIcon icon={faTrash} className="text-danger cursor-pointer" />
      </td>
    </tr>
  );
};

export default UserTable;
