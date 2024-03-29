"use server";
import { redirect } from "next/navigation";

import apiService from "@/app/services/apiService";

import setSessionCookies, { deleteSessionCookies } from "@/app/lib/utils";

export async function signup(_currentState, formData) {
  try {
    let data = {
      email: formData.get("inputEmail"),
      password1: formData.get("inputPassword"),
      password2: formData.get("inputPassword"),
    };
    const response = await apiService.postWithoutToken(
      "/api/v1/auth/registration/",
      JSON.stringify(data),
    );
    if (response.access) {
      setSessionCookies(response.user, response.access, response.refresh);
    } else {
      throw new Error("Signup failed. Response: " + JSON.stringify(response));
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing up:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
  redirect(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/`);
}

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
      throw Error("Sign in Failed. Response: " + JSON.stringify(response));
    }
  } catch (error) {
    // Handle errors
    console.error("Error occurred during signing ing:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
  redirect(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/`);
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
