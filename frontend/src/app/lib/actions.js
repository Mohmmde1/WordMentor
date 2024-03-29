"use server";

import apiService from "@/app/services/apiService";

import setSessionCookies from "@/app/lib/utils";
export async function signup(_currentState, formData) {}
export async function login(_currentState, formData) {
  try {
    let data = {
      email: formData.get("inputEmail"),
      password: formData.get("inputPassword"),
    };

    const response = await apiService.postWithoutToken(
      "/api/v1/auth/login/",
      JSON.stringify(data),
    );

    if (response.access) {
      setSessionCookies(response.user, response.access, response.refresh);
    } else {
      throw Error("The Response has no access token!");
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during authentication:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
