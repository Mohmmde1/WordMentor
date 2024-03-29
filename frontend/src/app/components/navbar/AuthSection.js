import { LoginModal, SignupModal } from "@/app/components/auth/AuthModals";

import { getUserId } from "@/app/lib/utils";
import LogoutButton from "@/app/components/navbar/LogoutButton";

export default function AuthSection() {
  const userId = getUserId();

  return (
    <ul className="navbar-nav">
      {userId ? (
        <>
          <li className="nav-item">
            <LogoutButton />
          </li>
        </>
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
}
