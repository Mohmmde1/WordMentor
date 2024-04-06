"use client";

import { fetchProfile } from "@/lib/actions";
import { useEffect, useState } from "react";

const ProfileCard = ({ styles }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const manageAvatar = async () => {
      const data = await fetchProfile();

      if (data.avatar_url) setAvatar(data.avatar_url);
      if (data.user.username) setUsername(data.user.username);
    };
    manageAvatar();
  }, []);
  useEffect(() => {}, [avatar, username]);
  return (
    <div
      className={`card mb-4 text-white ${styles["profile-card"]}`}
      style={{ backgroundColor: "#424242" }}
    >
      <div className="card-body rounded-circle text-center">
        <img
          src={
            process.env.NEXT_PUBLIC_BACKEND_HOST + avatar ||
            "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          }
          alt="avatar"
          className={`${styles["profile-img"]}`}
          style={{ width: "150px" }}
        />
        <h5 className={`my-3 ${styles["profile-card-title"]}`}>{username}</h5>

        <div className="d-flex justify-content-center mb-2">
          <button className={`btn btn-outline-primary ms-1 button`}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
