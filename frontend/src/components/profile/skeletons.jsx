import styles from "/public/css/profile.module.css";
export default function ProfileCardSkeleton() {
  return (
    <div
      className={`card mb-4 text-white ${styles["profile-card"]}`}
      style={{ backgroundColor: "#424242" }}
    >
      <div className="card-body rounded-circle text-center">
        <img
          src={
            "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          }
          alt="avatar"
          className={`${styles["profile-img"]}`}
          style={{ width: "150px", height: "150px" }}
        />
        <h5 className={`my-3 ${styles["profile-card-title"]}`}>Uploading...</h5>
        <div className="d-flex justify-content-center mb-2">
          <form>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              name="avatar"
              style={{ display: "none" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export function InfoCardSkeleton() {
  return (
    <div className={`card mb-4 text-white ${styles["info-card"]}`}>
      <div className="card-body">
        <div className="row m-3">
          <div className="col-sm-3">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
          <div className="col-sm-9">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-3">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
          <div className="col-sm-9">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-3">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
          <div className="col-sm-9">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-3">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
          <div className="col-sm-9">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-line"]}`}
            ></div>
          </div>
        </div>
        <div className="row m-3 pt-4">
          <div className="col-sm-9 offset-sm-6">
            <div
              className={`${styles["skeleton-placeholder"]} ${styles["skeleton-button"]}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
