import React from "react";
import styles from "./page.module.css";
import ProfileCard from "@/components/profile/card";

import InfoCard from "@/components/profile/info";

export default function Page({ params }) {
  return (
    <div className={`${styles["profile-page"]}`}>
      <div className="offset-sm-2 container ">
        <div className="row">
          <div className="col-lg-3 offset-sm-3">
            <ProfileCard styles={styles} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 ">
            <InfoCard styles={styles} />
          </div>
        </div>
      </div>
    </div>
  );
}
