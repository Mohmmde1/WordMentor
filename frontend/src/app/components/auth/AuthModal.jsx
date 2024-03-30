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
  const [errorMessage, dispatch] = useFormState(action, undefined);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header pb-4">
            <h5 className="modal-title" id={`${id}Label`}>
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
            <form id={`${id}Form`} action={dispatch}>
              <div className="form-group  pb-2">
                <label htmlFor={`${id}Email`} className="pb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id={`${id}Email`}
                  name="inputEmail"
                  aria-describedby={`${id}EmailHelp`}
                  placeholder="Enter email"
                />
                <small id={`${id}EmailHelp`} className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group pb-4">
                <label htmlFor={`${id}Password`} className="pb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id={`${id}Password`}
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
