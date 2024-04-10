import apiService from "@/services/apiService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Function to set session cookies
export default function setSessionCookies(user, access, refresh) {
  const cookieSettings = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  };

  cookies().set("session_userid", user.id, cookieSettings);
  cookies().set("session_access_token", access, cookieSettings);
  cookies().set("session_refresh_token", refresh, cookieSettings);
}

// Function to reset authentication cookies
export function resetAuthCookies() {
  cookies().set("session_userid", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
}

// Function to get user ID from cookies
export function getUserId() {
  const userId = cookies().get("session_userid")?.value;
  return userId ? userId : null;
}

// Function to get access token from cookies
export function getAccessToken() {
  const accessToken = cookies().get("session_access_token")?.value;
  return accessToken;
}

// Function to get access token from cookies
export function setAccessToken(token) {
  const response = NextResponse.next();
  response.cookies.set("session_access_token", token);
  return response;
}

// Function to get refresh token from cookies
export function getRefreshToken() {
  const refreshToken = cookies().get("session_refresh_token")?.value;
  return refreshToken;
}

// Function to delete all session cookies
export function deleteSessionCookies() {
  cookies().delete("session_userid");
  cookies().delete("session_access_token");
  cookies().delete("session_refresh_token");
}

export async function updateAccessToken() {
  const refresh = getRefreshToken();
  const url = "http://backend:8000/api/v1/auth/token/refresh/";
  const response = fetch(url, {
    method: "POST",
    body: { refresh },
    headers: {
      Accept: "*/*",
      "Content-Type": "*/*",
    },
  });
  console.log(JSON.stringify(response));
  // const token = response.access;
  // return setAccessToken(token);
}

// Function to verify the access token
export function verifyAccessToken(token) {
  try {
    // Decode the token payload
    const decoded = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    // Check if the token has expired
    const isExpired = Date.now() >= decoded.exp * 1000;

    return !isExpired;
  } catch (error) {
    // Handle verification errors
    console.error("Error verifying access token:", error);
    return false; // Token is invalid
  }
}
