import { Camera } from "lucide-react";
import { useUpdateAvatar } from "./useUpdateAvatar";
import { useState } from "react";
import Image from "next/image";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { DialogChangeImage } from "@/shared/components/base-components/dialog-change-image/DialogChangeImage";
import { PersonTag } from "@/shared/components/base-components";
import { useAuthContext } from "@/shared/contexts/AuthContext";

export const UserAvatar = () => {
  const { oppositeTheme } = useThemeContext();
  const { loggedInUser } = useAuthContext();
  const { handleUpdateAvatar } = useUpdateAvatar(() => {
    setIsVisibleDialog(false);
  });
  const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);
  if (!loggedInUser) {
    return <></>;
  }

  return (
    <>
      <div
        className={`absolute top-full -translate-y-1/2  right-1/2 translate-x-1/2 text-${oppositeTheme}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              priority
              className="w-[150px] h-[150px] object-cover rounded-full mobile:w-[100px] mobile:h-[100px]"
              width={100}
              height={100}
              src={loggedInUser.avatar}
              alt={loggedInUser.fullname}
              onMouseOver={() => setShowChangeAvatar(true)}
              onMouseOut={() => setShowChangeAvatar(false)}
              onTouchStart={() => setShowChangeAvatar(true)}
            />
            {showChangeAvatar && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-300 p-2 rounded-full cursor-pointer z-1"
                onClick={() => setIsVisibleDialog(true)}
                onMouseOver={() => setShowChangeAvatar(true)}
              >
                <Camera />
              </div>
            )}
          </div>
          <h2>{loggedInUser.fullname}</h2>
          <PersonTag name={loggedInUser.role} showIcon={false} />
        </div>
      </div>
      <DialogChangeImage
        isOpen={isVisibleDialog}
        setIsOpen={setIsVisibleDialog}
        handleOke={handleUpdateAvatar}
        title={"Thay đổi ảnh đại diện"}
      />
    </>
  );
};
