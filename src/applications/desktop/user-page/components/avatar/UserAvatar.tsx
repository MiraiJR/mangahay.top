import { useUploadFile } from "@/shared/hooks/useUploadFile";
import { Camera } from "lucide-react";
import { Dialog } from "primereact/dialog";
import { useUpdateAvatar } from "../../useUpdateAvatar";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { reduceQualityImage } from "@/shared/helpers/helpers";
import { userStore } from "@/shared/stores/userStore";
import { Button } from "primereact/button";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

export const UserAvatar = () => {
  const { oppositeTheme } = useContext(ThemeContext);
  const { userProfile } = userStore();
  const {
    file: avatar,
    setFile: setAvatar,
    handleUploadImage,
  } = useUploadFile();
  const {
    handleUpdateAvatar,
    isLoading: isLoadingAvatar,
    isSuccess: isSuccessaAvatar,
  } = useUpdateAvatar(avatar);
  const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleDialog(false);
  }, [isSuccessaAvatar]);

  const dialogFooter = (
    <div>
      <Button
        disabled={isLoadingAvatar}
        label="No"
        icon="pi pi-times"
        onClick={() => {
          setIsVisibleDialog(false);
          setAvatar(null);
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
                src={reduceQualityImage(userProfile.avatar)}
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
              <Dialog
                header="Thay đổi ảnh đại diện"
                visible={isVisibleDialog}
                onHide={() => {
                  setIsVisibleDialog(false);
                  setAvatar(null);
                }}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                footer={dialogFooter}
              >
                {!isLoadingAvatar ? (
                  <FileUpload
                    onSelect={(event: FileUploadSelectEvent) =>
                      handleUploadImage(event)
                    }
                    customUpload={true}
                    accept="image/*"
                    emptyTemplate={
                      <p className="m-0">Có thể kéo thả ảnh vào đây</p>
                    }
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-[100%] col-span-12">
                    <ProgressSpinner
                      style={{ width: "50px", height: "50px" }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                    <span>Đang tải ảnh lên</span>
                  </div>
                )}
              </Dialog>
            </div>
            <h2>{userProfile.fullname}</h2>
            <h2 className={`capitalize p-2 bg-green-400 rounded-xl`}>
              {userProfile.role}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
