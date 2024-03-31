"use client";
import { login } from "@/app/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import AuthButton from "@/app/components/auth/AuthButton";

const LoginModal = () => {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
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
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="loginModalForm" action={dispatch}>
              <div className="form-group  pb-2">
                <label htmlFor="loginModalEmail" className="pb-2">
                  Email address
                </label>
                <input
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
  );
};
export default LoginModal;
