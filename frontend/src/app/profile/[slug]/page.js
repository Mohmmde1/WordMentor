import React from "react";
import styles from "./page.module.css";
import ProfileCard from "@/components/profile/card";

import InfoCard from "@/components/profile/info";

export default function Page({ params }) {
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="offset-sm-1 container py-3">
        <div className="row">
          <div className="col-lg-2 offset-sm-4">
            <ProfileCard styles={styles} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 offset-sm-1">
            <InfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
