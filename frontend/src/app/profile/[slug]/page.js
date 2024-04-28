import styles from "/public/css/profile.module.css";
import ProfileCard from "@/components/profile/card";
import { Suspense } from "react";
import InfoCard from "@/components/profile/info";
import { fetchProfile } from "@/lib/actions";
import ProfileCardSkeleton, {
  InfoCardSkeleton,
} from "@/components/profile/skeletons";

export default async function Page({ params }) {
  const profile = await fetchProfile();
  console.log(profile);

  return (
    <div className={`${styles["profile-page"]}`}>
      <div className="offset-sm-2 container ">
        <div className="row">
          <div className="col-lg-3 offset-sm-3">
            <Suspense fallback={<ProfileCardSkeleton />}>
              <ProfileCard profile={profile} />
            </Suspense>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 ">
            <Suspense fallback={<InfoCardSkeleton />}>
              <InfoCard profile={profile} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
