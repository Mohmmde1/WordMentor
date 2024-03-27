"use server";

import { cookies } from "next/headers";
import apiService from "../services/apiService";

export const handleLogin = async (userId, accessToken, refreshToken) => {
  cookies().set("session_userid", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookies().set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 60 minutes
    path: "/",
  });

  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
};

export const resetAuthCookies = async () => {
  cookies().set("session_userid", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
};

export const getUserId = async () => {
  const userId = cookies().get("session_userid")?.value;
  return userId ? userId : null;
};

export const getAccessToken = async () => {
  let accessToken = cookies().get("session_access_token")?.value;
  return accessToken;
};

export async function authenticate(_currentState, formData) {
  try {
    let data = {
      username: formData.get("username"),
      password: formData.get("password"),
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
