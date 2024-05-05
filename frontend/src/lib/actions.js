"use server";
import apiService from "@/services/apiService";

import setSessionCookies, { deleteSessionCookies} from "@/lib/helpers";
import { getUserId, getProfileId } from "@/lib/helpers";

export async function checkUser() {
  try {
    const userId = getUserId();

    if (userId) return userId;
  } catch (error) {
    console.error("Error checking user:", error);
  }
}

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

export async function logout() {
  try {
    deleteSessionCookies();
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing ing:", error);

    throw error; // Re-throw the error to be caught by the caller
  }
}


export async function fetchProfile() {
  try {
    const profileId = getProfileId();
    if (!profileId) throw new Error("User is not logged in!");
    const response = await apiService.get(`profile/${profileId}`);

    return response;
  } catch (error) {
    console.error("Error occured during fetching profile: ", error);
    throw error;
  }
}
