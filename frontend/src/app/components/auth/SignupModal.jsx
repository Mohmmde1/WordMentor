"use client";
import { signup } from "@/app/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import AuthButton from "@/app/components/auth/AuthButton";

function SignupModal() {
  const [errorMessage, dispatch] = useFormState(signup, undefined);

  return (
    <div
      className="modal fade"
      id="signupModal"
      tabIndex="-1"
      aria-labelledby="signupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header pb-4">
            <h5 className="modal-title" id="signupModalLabel">
              Sign Up
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action={dispatch}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="inputFirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      name="inputFirstName"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      name="inputLastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputUsername" className="form-label">
                  Username
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name="inputUsername"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="inputEmail"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword1" className="form-label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="inputPassword1"
                  name="inputPassword1"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="inputPassword2" className="form-label">
                  Confirm Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="inputPassword2"
                  name="inputPassword2"
                  placeholder="Confirm your password"
                />
              </div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="d-flex justify-content-center">
                <AuthButton buttonText={"Sign Up"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
