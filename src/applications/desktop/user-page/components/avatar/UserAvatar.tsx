import { Camera } from "lucide-react";
import { Dialog } from "primereact/dialog";
import { useUpdateAvatar } from "./useUpdateAvatar";
import { useState } from "react";
import Image from "next/image";
import { userStore } from "@/shared/stores/user-storage";
import { Button } from "primereact/button";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { UploadImage } from "@/shared/components/base-components/upload-files/UploadImage";

export const UserAvatar = () => {
  const { oppositeTheme } = useThemeContext();
  const { userProfile } = userStore();
  const { handleUpdateAvatar, isLoading: isLoadingAvatar } = useUpdateAvatar(
    () => {
      setIsVisibleDialog(false);
    }
  );
  const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);

  const dialogFooter = (
    <div>
      <Button
        disabled={isLoadingAvatar}
        label="No"
        icon="pi pi-times"
        onClick={() => {
          setIsVisibleDialog(false);
        }}
        className="p-button-text"
      />
      <Button
        disabled={isLoadingAvatar}
        label="Yes"
        icon="pi pi-check"
        onClick={() => handleUpdateAvatar()}
        autoFocus
      />
    </div>
  );

  return (
    <>
      {userProfile && (
        <div
          className={`absolute top-full -translate-y-1/2  right-1/2 translate-x-1/2 text-${oppositeTheme}`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <Image
                priority
                className="w-[150px] h-[150px] object-cover rounded-full"
                width={100}
                height={100}
                src={userProfile.avatar}
                alt={userProfile.fullname}
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
            <h2>{userProfile.fullname}</h2>
            <h2 className={`capitalize p-2 bg-green-400 rounded-xl`}>
              {userProfile.role}
            </h2>
          </div>
        </div>
      )}
      <Dialog
        header="Thay đổi ảnh đại diện"
        visible={isVisibleDialog}
        onHide={() => {
          setIsVisibleDialog(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={dialogFooter}
      >
        <UploadImage />
      </Dialog>
    </>
  );
};
