"use server";
import apiService from "@/services/apiService";

import setSessionCookies, {
  deleteSessionCookies,
  getUserId,
} from "@/lib/utils";

export async function signup(_currentState, formData) {
  try {
    const data = {
      email: formData.get("inputEmail"),
      password1: formData.get("inputPassword1"),
      password2: formData.get("inputPassword2"),
      first_name: formData.get("inputFirstName"),
      last_name: formData.get("inputLastName"),
      username: formData.get("inputUsername"),
    };
    const response = await apiService.postWithoutToken(
      "auth/registration/",
      JSON.stringify(data),
    );
    console.log(response);
    if (response.access) {
      setSessionCookies(response.user, response.access, response.refresh);
      return {
        message: "success",
        errors: undefined,
      };
    } else {
      return {
        message: "fail",
        errors: JSON.stringify(response),
      };
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing up:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function login(_currentState, formData) {
  try {
    let data = {
      email: formData.get("inputEmail"),
      password: formData.get("inputPassword"),
    };

    const response = await apiService.postWithoutToken(
      "auth/login/",
      JSON.stringify(data),
    );

    if (response.access) {
      setSessionCookies(response.user, response.access, response.refresh);
      return {
        message: "success",
        errors: undefined,
      };
    } else {
      return {
        message: "fail",
        errors: JSON.stringify(response),
      };
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing ing:", error);

    throw error;
  }
}
export async function logout() {
  try {
    deleteSessionCookies();
    return {
      message: "success",
      errors: undefined,
    };
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing ing:", error);

    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchProfile() {
  try {
    const userId = getUserId();
    const response = await apiService.get(`profile/${userId}`);

    return response;
  } catch (error) {
    console.error("Error occured during fetching profile: ", error);
    throw error;
  }
}

export async function updateProfile(_currentState, formData) {
  try {
    const data = {
      email: formData.get("inputEmail"),
      first_name: formData.get("inputFirstName"),
      last_name: formData.get("inputLastName"),
      username: formData.get("inputUsername"),
    };

    const response = await apiService.postUpdate(
      `auth/user/`,
      JSON.stringify(data),
      "PUT",
    );

    if (response.id) {
      return {
        message: "success",
        errors: undefined,
      };
    } else {
      return {
        message: "fail",
        errors: JSON.stringify(response),
      };
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing up:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function checkUser() {
  try {
    const userId = getUserId();

    if (userId) return userId;
  } catch (error) {
    console.error("Error checking user:", error);
  }
}
