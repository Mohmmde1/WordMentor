const ProfileCard = ({ styles }) => {
  return (
    <div className={`card mb-4 text-white ${styles['card-container']}`} style={{ backgroundColor: "#424242" }}>
      <div className="card-body text-center rounded-circle">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt="avatar"
          className="rounded-circle img-fluid"
          style={{ width: "150px" }}
        />
        <h5 className="my-3">John Smith</h5>

        <div className="d-flex justify-content-center mb-2">

          <button type="button" className={`btn btn-outline-primary ms-1 ${styles['update-button']}`}>
            Update Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
