"use server";

import { cookies } from "next/headers";
import apiService from "../services/apiService";

export async function signup(_currentState, formData) {}
export async function login(_currentState, formData) {
  try {
    let data = {
      email: formData.get("inputEmail"),
      password: formData.get("inputPassword"),
    };

    const response = await apiService.postWithoutToken(
      "/api/v1/token/",
      JSON.stringify(data),
    );

    if (response.access) {
      // handleLogin(response.user.pk, response.access, response.refresh);

      // loginModal.close();

      // router.push('/')
      console.log(response.access);
    } else {
      // setErrors(response.non_field_errors);
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during authentication:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
