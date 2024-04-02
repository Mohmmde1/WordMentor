const ProfileMedia = () => {
  return (
    <div className="card mb-lg-0 mb-4">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush rounded-3">
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i className="fas fa-globe fa-lg text-warning"></i>
            <p className="mb-0">https://mdbootstrap.com</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i className="fab fa-github fa-lg" style={{ color: "#333333" }}></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i
              className="fab fa-twitter fa-lg"
              style={{ color: "#55acee" }}
            ></i>
            <p className="mb-0">@mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i
              className="fab fa-instagram fa-lg"
              style={{ color: "#ac2bac" }}
            ></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i
              className="fab fa-facebook-f fa-lg"
              style={{ color: "#3b5998" }}
            ></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMedia;
