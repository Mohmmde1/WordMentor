"use client";
import { fetchProfile } from "@/lib/actions";
import React, { useEffect, useState } from "react";

const InfoCard = ({ styles }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = () => {
    // Logic to update the information can be added here
    console.log("Information updated");
  };

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile();
      console.log(data);
      setFirstName(data.user.first_name);
      setLastName(data.user.last_name);
      setUsername(data.user.username);
      setEmail(data.user.email);
    };
    getProfile();
  }, []);

  return (
    <div className={`card mb-4 text-white ${styles["info-card"]}`}>
      <div className="card-body">
        <div className="row m-3">
          <div className="col-sm-3">
            <label htmlFor="firstName" className="mb-0">
              First Name
            </label>
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
        <div className="row m-3">
          <div className="col-sm-3">
            <label htmlFor="lastName" className="mb-0">
              Last Name
            </label>
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
        <div className="row m-3">
          <div className="col-sm-3">
            <label htmlFor="username" className="mb-0">
              Username
            </label>
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
        <div className="row m-3">
          <div className="col-sm-3">
            <label htmlFor="email" className="mb-0">
              Email
            </label>
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
        <div className="row m-3 pt-4">
          <div className="col-sm-9 offset-sm-6">
            <button
              type="button"
              className={`btn btn-primary button `}
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
