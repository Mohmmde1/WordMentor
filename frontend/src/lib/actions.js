"use server";
import apiService from "@/services/apiService";

import setSessionCookies from "@/lib/helpers";

export async function login(formData) {
  try {
    let data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await apiService.postWithoutToken(
      "auth/login/",
      JSON.stringify(data)
    );

    if (response.access) {
      await setSessionCookies(response.user, response.access, response.refresh);
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing in:", error);

    throw error;
  }
}
