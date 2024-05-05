import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { handleImageUpload } from '@/lib/actions';

const ProfileAvatar = ({ profile, setIsHovered, isHovered, setIsUpdated, isUpdated }) => {

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="size-20">
        {profile && (
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${profile.avatar_url}`}
          />
        )}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {isHovered && (
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer"
        >
          Upload
          <input
            id="avatar-upload"
            type="file"
            className="absolute opacity-0 w-0 h-0"
            onChange={async (e) => {
              const formState = new FormData();
              formState.append('avatar', e.target.files[0]);
              await handleImageUpload(formState);
              setIsUpdated(!isUpdated); // Toggle the state to trigger re-render
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ProfileAvatar;
