import React from "react";
import styles from "./page.module.css";
import ProfileCard from "@/components/profile/card";
import ProfileMedia from "@/components/profile/media";
import InfoCard from "@/components/profile/info";
import BarCard from "@/components/profile/bar";

export default function Page({ params }) {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <ProfileCard />
            <ProfileMedia />
          </div>
          <div className="col-lg-8">
            <InfoCard />
            <div className="row">
              <BarCard />
              <BarCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
