import { handleImageUpload } from "@/lib/actions";
import styles from "/public/css/profile.module.css";
const ProfileCard = ({ profile }) => {
  return (
    <div
      className={`card mb-4 text-white ${styles["profile-card"]}`}
      style={{ backgroundColor: "#424242" }}
    >
      <div className="card-body rounded-circle text-center">
        <img
          src={
            `${process.env.NEXT_PUBLIC_BACKEND_HOST + profile.avatar_url}` ||
            "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          }
          alt="avatar"
          className={`${styles["profile-img"]}`}
          style={{ width: "150px", height: "150px" }}
        />
        <h5 className={`my-3 ${styles["profile-card-title"]}`}>
          {profile.user.username}
        </h5>
        <div className="d-flex justify-content-center mb-2">
          <form action={handleImageUpload}>
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
