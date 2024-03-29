"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      className="nav-link"
      onClick={() => {
        router.push("/logout");
      }}
    >
      Logout
    </button>
  );
}
