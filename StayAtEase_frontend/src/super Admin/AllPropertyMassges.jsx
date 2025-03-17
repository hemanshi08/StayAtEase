import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    mobile: "+1 888 888 8888",
    lastActivity: "2 mins ago",
    created: "30 Sep 2023",
    status: "Active",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "John Smith",
    email: "johnsmith@example.com",
    mobile: "518-837-9258",
    lastActivity: "10 mins ago",
    created: "27 Sep 2023",
    status: "Active",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Robert",
    email: "robert@example.com",
    mobile: "302-372-7812",
    lastActivity: "Online",
    created: "25 Sep 2023",
    status: "Active",
    image: "https://via.placeholder.com/40",
  },
];

const UserTable = () => {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Total Users</h2>
      <div className="table-responsive">
        <table className="table table-borderless align-middle shadow-sm">
          <thead className="bg-light">
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
            {users.map((user, index) => (
              <tr key={user.id} className="border-bottom">
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={user.image}
                      alt="Profile"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      <div className="text-muted small">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.mobile}</td>
                <td>{user.lastActivity}</td>
                <td>{user.created}</td>
                <td>
                  <span className="badge text-success" style={{ backgroundColor: "#d4f8d4" }}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary me-3 cursor-pointer"
                    style={{ cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger cursor-pointer"
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
