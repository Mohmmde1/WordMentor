"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import SignupModal from "@/components/auth/SignupModal";
import LoginModal from "@/components/auth/LoginModal";

export default function AuthSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Initialize with null or default value

  useEffect(() => {}, [loggedIn]);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  // Callback function to update userId after successful login
  const handleAuthenticateSuccess = (loggedIn, message) => {
    setLoggedIn(loggedIn);
    setShowLoginModal(false); // Close the login modal
    setShowSignupModal(false); // Close the signup modal
    toast.success(message);
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
            <a className="nav-link" onClick={openSignupModal}>
              Signup
            </a>
            <SignupModal
              show={showSignupModal}
              onClose={closeSignupModal}
              onAuthenticateSuccess={handleAuthenticateSuccess}
            />
          </li>
        </>
      )}
      <LoginModal
        show={showLoginModal}
        onClose={closeLoginModal}
        onAuthenticateSuccess={handleAuthenticateSuccess}
      />
    </ul>
  );
}
