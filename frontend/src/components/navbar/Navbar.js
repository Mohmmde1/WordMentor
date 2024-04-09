import React from "react";
import Link from "next/link";

import AuthSection from "@/components/navbar/AuthSection";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark p-2">
      <Link className="navbar-brand" href="/">
        WordMentor
      </Link>
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
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
        </ul>
        <AuthSection />
      </div>
    </nav>
  );
};
export default Navbar;
