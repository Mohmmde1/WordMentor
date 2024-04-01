"use client";
import { useState, useEffect } from "react";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";

export default function AuthSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Initialize with null or default value

  useEffect(() => {}, [loggedIn]);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // Callback function to update userId after successful login
  const handleLoginSuccess = (loggedIn) => {
    setLoggedIn(loggedIn);
    setShowLoginModal(false); // Close the login modal
  };

  return (
    <ul className="navbar-nav">
      {loggedIn ? (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/api/logout">
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <a className="nav-link" onClick={openLoginModal}>
              Login
            </a>
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
        </>
      )}
      <LoginModal
        show={showLoginModal}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </ul>
  );
}
