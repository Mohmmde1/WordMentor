"use client";
import { fetchProfile, updateProfile } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
const InfoCard = ({ styles }) => {
  const [firstName, setFirstName] = useState("first name");
  const [lastName, setLastName] = useState("last name");
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [formState, action] = useFormState(updateProfile, {
    message: "",
    errors: "",
  });

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
  }, [formState]);

  return (
    <div className={`card mb-4 text-white ${styles["info-card"]}`}>
      <div className="card-body">
        <form action={action}>
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
                name="inputFirstName"
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
                name="inputLastName"
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
                name="inputUsername"
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
                name="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row m-3 pt-4">
            <div className="col-sm-9 offset-sm-6">
              <button
                type="submit"
                className={`btn btn-primary button `}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoCard;
