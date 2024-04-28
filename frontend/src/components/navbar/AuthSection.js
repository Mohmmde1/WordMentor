"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import SignupModal from "@/components/auth/SignupModal";
import LoginModal from "@/components/auth/LoginModal";
import { checkUser, fetchProfile, logout } from "@/lib/actions";

export default function AuthSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("/media/avatars/avatar.jpeg");

  useEffect(() => {
    const isLoggedIn = async () => {
      const userId = await checkUser();
      if (userId) {
        const response = await fetchProfile();
        console.log(response);
        if (response.id) {
          if (response.user.username) setUsername(response.user.username);
          if (response.avatar_url) setAvatar(response.avatar_url);
          setLoggedIn(true);
        } else {
          throw Error("User has no profile!");
        }
      }
    };
    isLoggedIn();
  }, [loggedIn]);

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

  const handleAuthenticateSuccess = (loggedIn, message) => {
    setLoggedIn(loggedIn);
    setShowLoginModal(false);
    setShowSignupModal(false);
    if (loggedIn) toast.success(message);
    else if (message) toast.error(message);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("You have logged out successfully!");
    setLoggedIn(false);
  };

  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDarkDropdown"
              aria-controls="navbarNavDarkDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDarkDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {loggedIn ? (
                    <img
                      src={process.env.NEXT_PUBLIC_BACKEND_HOST + avatar}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    "Guest"
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  {loggedIn ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          href={`/profile/${username}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                            style={{ marginRight: "8px" }}
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                          </svg>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href={`/books`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-book"
                            viewBox="0 0 16 16"
                            style={{ marginRight: "8px" }}
                          >
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                          </svg>{""}
                          Books
                        </Link>
                      </li>
                      <div
                        className="dropdown-divider"
                        style={{ backgroundColor: "white" }}
                      ></div>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-box-arrow-right"
                            viewBox="0 0 16 16"
                            style={{ marginRight: "8px", fill: "red" }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                            />
                          </svg>
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
