"use client";

import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary">
      Login
    </button>
  );
}

const LoginModal = () => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header pb-4">
            <h5 className="modal-title " id="exampleModalLabel">
              Login
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group  pb-2">
                <label for="exampleInputEmail1" className="pb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group pb-4">
                <label for="exampleInputPassword1" className="pb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>

              <LoginButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
