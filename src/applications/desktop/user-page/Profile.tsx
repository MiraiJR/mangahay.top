import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { userStore } from "@/shared/stores/userStore";
import { useUpdateProfile } from "./useUpdateProfile";
import { UserAvatar } from "./components/avatar/UserAvatar";
import { UserWallPaper } from "./components/wallpaper/UserWallpaper";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

const Profile = () => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const { userProfile } = userStore();
  const {
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    handleUpdateProfile,
    isLoading: isLoadingProfile,
  } = useUpdateProfile();

  return (
    <>
      {userProfile && (
        <div className={`bg-${theme} text-${oppositeTheme}`}>
          <div className="relative border">
            <UserWallPaper />
            <UserAvatar />
          </div>
          <div className="mt-[100px] flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 w-[100%] ">
              <label htmlFor="fullname">Tên hiển thị</label>
              <InputText
                id="fullname"
                placeholder="Cập nhật họ và tên"
                aria-describedby="username-help"
                className="w-[100%]"
                value={fullName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFullName(event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%] ">
              <div className="flex gap-3">
                <label htmlFor="phone">Số điện thoại</label>
                {!userProfile.phone && (
                  <span className="text-red-400">*Cập nhật số điện thoại</span>
                )}
              </div>
              <InputText
                id="phone"
                placeholder="Cập nhật số điện thoại"
                aria-describedby="username-help"
                className="w-[100%]"
                value={phoneNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(event.target.value)
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
                value={userProfile.email}
              />
            </div>
            <button
              disabled={isLoadingProfile}
              className="btn-primary w-fit"
              onClick={() => handleUpdateProfile()}
            >
              {isLoadingProfile ? (
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
      )}
    </>
  );
};

export default Profile;
