import React, { useEffect } from "react";
import { login } from "@/lib/actions";
import { useFormState } from "react-dom";
import AuthButton from "@/components/auth/AuthButton";

const LoginModal = ({ show, onClose, onAuthenticateSuccess }) => {
  const [formState, formAction] = useFormState(login, {
    message: "",
    errors: undefined,
  });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (formState.message === "success") {
      onClose();
      onAuthenticateSuccess(true, "User has successfully logged in");
    } else if (formState.message === "fail") {
      onClose();
      onAuthenticateSuccess(false, formState.errors);
    }
  }, [formState]);

  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden={!show}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pb-4">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="loginModalForm" action={formAction}>
                <div className="form-group  pb-2">
                  <label htmlFor="loginModalEmail" className="pb-2">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="loginModalEmail"
                    name="inputEmail"
                    aria-describedby="loginModalEmailHelp"
                    placeholder="Enter email"
                  />
                  <small
                    id="loginModalEmailHelp"
                    className="form-text text-muted"
                  >
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="loginModalPassword" className="pb-2">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="loginModalPassword"
                    name="inputPassword"
                    placeholder="Password"
                  />
                </div>

                <AuthButton buttonText={"Login"} />
              </form>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default LoginModal;
