"use server";
import apiService from "@/services/apiService";

import setSessionCookies, {
  deleteSessionCookies,
  getUserId,
  getAccessToken,
} from "@/lib/utils";
import { redirect } from "next/navigation";

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
    if (!userId) throw new Error("User is not logged in!");
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

export async function handleImageUpload(_currentState, formState) {
  const avatar = formState.get("avatar");
  const formData = new FormData();
  formData.append("avatar", avatar);

  try {
    const response = await apiService.postFile(
      `profile/${getUserId()}/upload-image/`,
      formData,
      "POST",
    );
    console.log(response);
    if (response.id) {
      return { message: "success", errors: "" };
      // Optionally, do something after successful upload
    } else {
      return { message: "fail", errors: "" };
      // Handle error
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    // Handle error
  }
}
