import styles from "./page.module.css";
import ProfileCard from "@/components/profile/card";

import InfoCard from "@/components/profile/info";
import { fetchProfile } from "@/lib/actions";

export default async function Page({ params }) {
  const profile = await fetchProfile();
  console.log(profile);
  return (
    <div className={`${styles["profile-page"]}`}>
      <div className="offset-sm-2 container ">
        <div className="row">
          <div className="col-lg-3 offset-sm-3">
            <ProfileCard styles={styles} profile={profile} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 ">
            <InfoCard styles={styles} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
