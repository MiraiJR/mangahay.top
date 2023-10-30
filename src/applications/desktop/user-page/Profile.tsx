import themeStore from "@/shared/stores/themeStore";
import { Camera } from "lucide-react";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { toast } from "react-toastify";
import MeService from "@/shared/services/meService";
import { ProgressSpinner } from "primereact/progressspinner";
import { reduceQualityImage } from "@/shared/helpers/helpers";

interface itemProps {
  user: User;
}

interface StatusLoading {
  avatar?: boolean;
  profile?: boolean;
}

interface ChangedProfile {
  fullname: string;
  phone: string;
}

const Profile = ({ user }: itemProps) => {
  const fileUploadRef = useRef<any>(null);
  const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [me, setMe] = useState<User>(user);
  const [loading, setLoading] = useState<StatusLoading>({
    avatar: false,
    profile: false,
  });
  const [changedProfile, setChangedProfile] = useState<ChangedProfile>({
    fullname: me.fullname,
    phone: me.phone ?? "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeAvatar = async () => {
    if (!avatar) {
      toast.warning("Vui lòng chọn ảnh!");
      return;
    }

    setLoading({
      avatar: true,
    });

    const formData = new FormData();
    formData.append("file", avatar);

    try {
      const { data } = await MeService.updateAvatar(formData);

      setMe(data);
      setLoading({
        avatar: false,
      });
      setIsVisibleDialog(false);
      toast.success("Đổi avatar thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const footerContent = (
    <div>
      <Button
        disabled={loading.avatar}
        label="No"
        icon="pi pi-times"
        onClick={() => {
          setIsVisibleDialog(false);
          setAvatar(null);
        }}
        className="p-button-text"
      />
      <Button
        disabled={loading.avatar}
        label="Yes"
        icon="pi pi-check"
        onClick={handleChangeAvatar}
        autoFocus
      />
    </div>
  );

  const handleUploadImage = (e: FileUploadSelectEvent) => {
    if (e.files.length > 1) {
      toast.warn("Ảnh mô tả chỉ cần 1 ảnh thôi!");
      setAvatar(null);
      return;
    }

    setAvatar(e.files[0]);
  };

  const handleUpdateProfile = async () => {
    if (changedProfile.fullname.trim() === "") {
      setErrorMessage("Tên hiển thị là bắt buộc!");
      return;
    }

    const regex = /^0\d{9}$/;
    if (
      changedProfile.phone.trim() !== "" &&
      !regex.test(changedProfile.phone)
    ) {
      setErrorMessage("Số điện thoại không hợp lệ!");
      return;
    }

    setLoading((pre) => {
      return {
        ...pre,
        profile: true,
      };
    });

    try {
      const { fullname, phone } = changedProfile;
      const { data } = await MeService.updateProfile({ fullname, phone });
      setMe(data);
      setLoading((pre) => {
        return {
          ...pre,
          profile: false,
        };
      });
    } catch (error: any) {
      toast.error(error.message);
    }
    setErrorMessage(null);
  };

  return (
    <div
      className={`bg-${themeStore.getTheme()} text-${themeStore.getOppositeTheme()}`}
    >
      <div className="relative border">
        {user.wallpaper ? (
          <Image
            width={100}
            height={100}
            className="w-[100%] h-[300px]"
            src={me.wallpaper}
            alt={me.fullname}
          />
        ) : (
          <div
            className={`w-[100%] h-[300px] flex flex-col items-center justify-center font-bold text-xl flex-wrap`}
          >
            Cảm ơn bạn đã chọn
            <span>MangaHay.Top</span>
          </div>
        )}
        <div
          className={`absolute top-full -translate-y-1/2  right-1/2 translate-x-1/2 text-${themeStore.getOppositeTheme()}`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <Image
                priority
                className="w-[150px] h-[150px] object-cover rounded-full"
                width={100}
                height={100}
                src={reduceQualityImage(me.avatar)}
                alt={me.fullname}
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
                footer={footerContent}
              >
                {!loading.avatar ? (
                  <FileUpload
                    ref={fileUploadRef}
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
            <h2>{me.fullname}</h2>
            <h2 className={`capitalize p-2 bg-green-400 rounded-xl`}>
              {me.role}
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-[100px] flex flex-col gap-4 items-center">
        {errorMessage && <div className="text-red-400">{errorMessage}</div>}
        <div className="flex flex-col gap-2 w-[100%] ">
          <label htmlFor="fullname">Tên hiển thị</label>
          <InputText
            id="fullname"
            placeholder="Cập nhật số điện thoại"
            aria-describedby="username-help"
            className="w-[100%]"
            value={changedProfile.fullname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setChangedProfile((pre) => {
                return {
                  ...pre,
                  fullname: event.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-[100%] ">
          <div className="flex gap-3">
            <label htmlFor="phone">Số điện thoại</label>
            {!user.phone && (
              <span className="text-red-400">*Cập nhật số điện thoại</span>
            )}
          </div>
          <InputText
            id="phone"
            placeholder="Cập nhật số điện thoại"
            aria-describedby="username-help"
            className="w-[100%]"
            value={changedProfile.phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setChangedProfile((pre) => {
                return {
                  ...pre,
                  phone: event.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-[100%] ">
          <label htmlFor="email">Địa chỉ email</label>
          <InputText
            id="email"
            placeholder="Cập nhật số điện thoại"
            aria-describedby="username-help"
            className="w-[100%]"
            disabled
            value={me.email}
          />
        </div>
        <button
          disabled={loading.profile}
          className="btn-primary w-fit"
          onClick={handleUpdateProfile}
        >
          {loading.profile ? (
            <ProgressSpinner
              style={{ width: "80px", height: "30px" }}
              strokeWidth="10"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : (
            <span>Cập nhật</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
