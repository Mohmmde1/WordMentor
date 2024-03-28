"use server";

import { cookies } from "next/headers";
import apiService from "../services/apiService";

export async function authenticate(_currentState, formData) {
  try {
    console.log(formData);
    let data = {
      email: formData.get("loginEmailInput"),
      password: formData.get("loginInputPassword"),
    };

    const response = await apiService.postWithoutToken(
      "/api/v1/auth/",
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
