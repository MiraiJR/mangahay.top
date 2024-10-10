import { userStore } from "@/shared/stores/userStore";
import Image from "next/image";

export const UserWallPaper = () => {
  const { userProfile } = userStore();
  if (!userProfile) {
    return <></>;
  }

  return (
    <>
      {userProfile.wallpaper ? (
        <Image
          width={100}
          height={100}
          className="w-[100%] h-[300px]"
          src={userProfile.wallpaper}
          alt={userProfile.fullname}
        />
      ) : (
        <div
          className={`w-[100%] h-[300px] flex flex-col items-center justify-center font-bold text-xl flex-wrap`}
        >
          Cảm ơn bạn đã chọn
          <span>MangaHay.Top</span>
        </div>
      )}
    </>
  );
};
