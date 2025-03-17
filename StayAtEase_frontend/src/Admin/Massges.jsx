import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import Header from "./component/header";

const PropertyMessages = () => {
 
  const messagesData = [
    { id: 1, name: "Sarah Johnson", propertyId: "P.307", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 2, name: "Michael Brown", propertyId: "P.309", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 3, name: "Emma Davis", propertyId: "P.310", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" },
    { id: 4, name: "Michael Brown", propertyId: "P.305", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 5, name: "Sarah Johnson", propertyId: "P.301", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 6, name: "Michael Brown", propertyId: "P.302", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 7, name: "Emma Davis", propertyId: "P.303", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" },
    { id: 8, name: "Michael Brown", propertyId: "P.305", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 9, name: "Sarah Johnson", propertyId: "P.301", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 10, name: "Michael Brown", propertyId: "P.302", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredMessages = messagesData.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <Header/>
    <div className="container mt-6">
    <h3 className="fw-bold my-4 py-2">All Property Messages</h3>


      {/* Search Bar */}
      <div className="mb-4 position-relative ">
  <i className="bi bi-search position-absolute" style={{ left: "15px", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }}></i>
  <input
    type="text"
    className="form-control ps-5"
    placeholder="Search messages..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Property Id</th>
              <th>Email Address</th>
              <th>Contact No</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.propertyId}</td>
                  <td>{msg.email}</td>
                  <td>{msg.contact}</td>
                  <td>{msg.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 py-6">
        <p className="text-muted">Showing {filteredMessages.length} of {messagesData.length} messages</p>
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled"><a className="page-link">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PropertyMessages;
