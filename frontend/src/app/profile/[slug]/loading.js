import ProfileCardSkeleton, {
  InfoCardSkeleton,
} from "@/components/profile/skeletons";
import styles from "/public/css/profile.module.css";
export default function Loading() {
  return (
    <div className={`${styles["profile-page"]}`}>
      <div className="offset-sm-2 container ">
        <div className="row">
          <div className="col-lg-3 offset-sm-3">
            <ProfileCardSkeleton />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 ">
            <InfoCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
