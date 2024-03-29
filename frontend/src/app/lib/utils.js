import { cookies } from "next/headers";

// Function to set session cookies
export default function setSessionCookies(user, access, refresh) {
  const cookieSettings = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  };

  cookies().set("session_userid", user.pk, cookieSettings);
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

// Function to get refresh token from cookies
export async function getRefreshToken() {
  const refreshToken = cookies().get("session_refresh_token")?.value;
  return refreshToken;
}

// Function to delete all session cookies
export function deleteSessionCookies() {
  cookies().delete("session_userid");
  cookies().delete("session_access_token");
  cookies().delete("session_refresh_token");
}
