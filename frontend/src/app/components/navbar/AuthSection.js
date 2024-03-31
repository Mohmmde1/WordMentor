import { getUserId } from "@/app/lib/utils";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";

export default function AuthSection() {
  const userId = getUserId();

  return (
    <ul className="navbar-nav">
      {userId ? (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/logout">
              Logout
            </a>
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
