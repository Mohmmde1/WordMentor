import styles from "/public/css/profile.module.css";
import { updateProfile } from "@/lib/actions";
const InfoCard = ({ profile }) => {
  return (
    <div className={`card mb-4 text-white ${styles["info-card"]}`}>
      <div className="card-body">
        <form action={updateProfile}>
          <div className="row m-3">
            <div className="col-sm-3">
              <label htmlFor="firstName" className="mb-0">
                First Name
              </label>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="inputFirstName"
                defaultValue={profile.user.first_name}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-sm-3">
              <label htmlFor="lastName" className="mb-0">
                Last Name
              </label>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="inputLastName"
                defaultValue={profile.user.last_name}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-sm-3">
              <label htmlFor="username" className="mb-0">
                Username
              </label>
            </div>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="username"
                name="inputUsername"
                defaultValue={profile.user.username}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-sm-3">
              <label htmlFor="email" className="mb-0">
                Email
              </label>
            </div>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                name="inputEmail"
                defaultValue={profile.user.email}
              />
            </div>
          </div>
          <div className="row m-3 pt-4">
            <div className="col-sm-9 offset-sm-6">
              <button type="submit" className={`btn btn-primary button `}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoCard;
