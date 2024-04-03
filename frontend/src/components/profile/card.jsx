
const ProfileCard = ({ styles }) => {
  return (
    <div
      className={`card mb-4 text-white ${styles["profile-card"]}`}
      style={{ backgroundColor: "#424242" }}
    >
      <div className="card-body rounded-circle text-center">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt="avatar"
          className={`${styles["profile-img"]}`}
          style={{ width: "150px" }}
        />
        <h5 className={`my-3 ${styles["profile-card-title"]}`}>John Smith</h5>

        <div className="d-flex justify-content-center mb-2">
          <button

            className={`btn btn-outline-primary ms-1 ${styles["update-button"]}`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
