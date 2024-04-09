"use client";
import { handleImageUpload } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const ProfileCard = ({ styles, profile, onUpdate }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [formState, action] = useFormState(handleImageUpload, {
    message: "",
    errors: "",
  });

  useEffect(() => {
    if (profile) {
      setAvatar(profile.avatar_url);
      setUsername(profile.user.username);
    }
  }, [profile]);

  useEffect(() => {
    console.log(formState);
    if (formState.message === "success") {
      toast.success("File uploaded successfully");
      onUpdate();
    } else if (formState.message === "fail") toast.error("File upload failed!");
  }, [formState]);

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
          style={{ width: "150px", height: "150px" }}
        />
        <h5 className={`my-3 ${styles["profile-card-title"]}`}>{username}</h5>
        <div className="d-flex justify-content-center mb-2">
          <form action={action}>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              name="avatar"
              style={{ display: "none" }}
            />
            <label
              htmlFor="imageUpload"
              className="btn btn-outline-primary ms-1 button"
            >
              Upload
            </label>
            <button
              type="submit"
              className="btn btn-outline-primary ms-1 button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
