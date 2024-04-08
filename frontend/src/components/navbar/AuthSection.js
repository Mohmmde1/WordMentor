"use client";
import { useState, useEffect, useId } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import SignupModal from "@/components/auth/SignupModal";
import LoginModal from "@/components/auth/LoginModal";

import { checkUser, fetchProfile, logout } from "@/lib/actions";

export default function AuthSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedIn = async () => {
      const userId = await checkUser();
      if (userId) {
        const response = await fetchProfile();
        if (response.user.username) setUsername(response.user.username);
      }
      if (userId) setLoggedIn(true);
    };
    isLoggedIn();
  }, [loggedIn]);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleAuthenticateSuccess = (loggedIn, message) => {
    setLoggedIn(loggedIn);
    setShowLoginModal(false);
    setShowSignupModal(false);
    if (loggedIn) toast.success(message);
    else if (message) toast.error(message);
  };
  const handleLogout = async () => {
    await logout();

    toast.success("You have logged out successfuly!");
    setLoggedIn(false);
  };
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowDropdown(!showDropdown)}
          ></button>
          <div
            className={
              "collapse navbar-collapse" + (showDropdown ? " show" : "")
            }
            id="navbarNavDarkDropdown"
          >
            <ul className="navbar-nav dropdown-menu-lg">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark btn-lg dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {!useId ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-box-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                        />
                      </svg>
                    </>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-box-arrow-in-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {loggedIn ? (
                    <>
                      <li>
                        <a
                          className="dropdown-item"
                          href={`/profile/${username}`}
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a className="dropdown-item" onClick={openLoginModal}>
                          Login
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={openSignupModal}>
                          Signup
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal
        show={showLoginModal}
        onClose={closeLoginModal}
        onAuthenticateSuccess={handleAuthenticateSuccess}
      />
      <SignupModal
        show={showSignupModal}
        onClose={closeSignupModal}
        onAuthenticateSuccess={handleAuthenticateSuccess}
      />
    </>
  );
}
