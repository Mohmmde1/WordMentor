import React from "react";
import LoginModal from "./LoginModel";
import SignupModal from "./SignupModal";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <a className="navbar-brand" href="#">
        Your Logo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="navbar-collapse justify-content-between collapse"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Login
            </a>
            <LoginModal />
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#signupModal"
            >
              Signup
            </a>

            <SignupModal />
          </li>
        </ul>
      </div>
    </nav>
  );
}
