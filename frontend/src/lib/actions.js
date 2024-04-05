"use server";
import { redirect } from "next/navigation";

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
export async function logout(_currentState, formData) {
  try {
    deleteSessionCookies();
    const response = await apiService.postWithoutToken("/api/v1/auth/logout/");
    console.log(JSON.stringify(response));
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing ing:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
  redirect(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/`);
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
    console.log(response);
    // if (response.access) {
    //   setSessionCookies(response.user, response.access, response.refresh);
    //   return {
    //     message: "success",
    //     errors: undefined,
    //   };
    // } else {
    //   return {
    //     message: "fail",
    //     errors: JSON.stringify(response),
    //   };
    // }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing up:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
