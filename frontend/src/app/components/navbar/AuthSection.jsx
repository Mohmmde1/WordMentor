"use client";
import { LoginModal, SignupModal } from "@/app/components/auth/AuthModals";

export default function AuthSection() {
  return (
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
  );
}
