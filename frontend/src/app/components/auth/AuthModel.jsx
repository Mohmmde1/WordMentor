"use client";

import { useFormState, useFormStatus } from "react-dom";

function AuthButton({ buttonText }) {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary">
      {buttonText}
    </button>
  );
}

const AuthModal = ({ id, title, action, buttonText }) => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="authModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header pb-4">
            <h5 className="modal-title" id="authModalLabel">
              {title}
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
                <label htmlFor="inputEmail" className="pb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group pb-4">
                <label htmlFor="inputPassword" className="pb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="inputPassword"
                  placeholder="Password"
                />
              </div>

              <AuthButton buttonText={buttonText} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
