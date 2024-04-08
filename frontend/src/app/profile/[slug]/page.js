"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProfileCard from "@/components/profile/card";

import InfoCard from "@/components/profile/info";
import { fetchProfile } from "@/lib/actions";

export default function Page({ params }) {
  const [profile, setProfile] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const manageProfile = async () => {
      const response = await fetchProfile();
      if (response.id) setProfile(response);
    };
    manageProfile();
    console.log(reload);
    console.log(profile);
  }, [reload]);
  const onUpdate = () => setReload(!reload);
  return (
    <div className={`${styles["profile-page"]}`}>
      <div className="offset-sm-2 container ">
        <div className="row">
          <div className="col-lg-3 offset-sm-3">
            <ProfileCard
              styles={styles}
              profile={profile}
              onUpdate={onUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 ">
            <InfoCard styles={styles} profile={profile} onUpdate={onUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}
