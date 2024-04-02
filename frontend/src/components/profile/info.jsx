'use client';
import React, { useState } from "react";

const InfoCard = () => {
  const [firstName, setFirstName] = useState("Johnatan");
  const [lastName, setLastName] = useState("Smith");
  const [username, setUsername] = useState("john_smith");
  const [email, setEmail] = useState("example@example.com");

  const handleUpdate = () => {
    // Logic to update the information can be added here
    console.log("Information updated");
  };

  return (
    <div className="card mb-4 text-white" style={{ backgroundColor: "#424242" }}>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-3">
            <label htmlFor="firstName" className="mb-0">First Name</label>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-3">
            <label htmlFor="lastName" className="mb-0">Last Name</label>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-3">
            <label htmlFor="username" className="mb-0">Username</label>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-3">
            <label htmlFor="email" className="mb-0">Email</label>
          </div>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-9 offset-sm-3">
            <button type="button" className="btn btn-primary float-end" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
