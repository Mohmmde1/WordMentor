import React from "react";
import AuthSection from "@/app/components/navbar/AuthSection";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <a className="navbar-brand" href="#">
        WordMentor
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
        <AuthSection />
      </div>
    </nav>
  );
};
export default Navbar;
