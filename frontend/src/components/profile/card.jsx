"use client";

import { useEffect, useState } from "react";

const ProfileCard = ({ styles, profile }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const manageAvatar = async () => {
      if (profile) {
        setAvatar(profile.avatar_url);
        setUsername(profile.user.username);
      }
    };
    manageAvatar();
  }, [profile]);

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
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <label
            htmlFor="imageUpload"
            className="btn btn-outline-primary ms-1 button"
          >
            Upload
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
