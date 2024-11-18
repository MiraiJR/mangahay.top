import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { userStore } from "@/shared/stores/user-storage";
import { useUpdateProfile } from "./useUpdateProfile";
import { UserAvatar } from "./components/avatar/UserAvatar";
import { UserWallPaper } from "./components/wallpaper/UserWallpaper";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { theme, oppositeTheme } = useThemeContext();
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
              <label htmlFor="fullname">
                {t("profileField.displayName.label", { ns: "profile" })}
              </label>
              <InputText
                id="fullname"
                placeholder={t("profileField.displayName.placeholder", {
                  ns: "profile",
                })}
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
                <label htmlFor="phone">
                  {t("profileField.phone.label", { ns: "profile" })}
                </label>
                {!userProfile.phone && (
                  <span className="text-red-400">
                    *{t("profileField.phone.placeholder", { ns: "profile" })}
                  </span>
                )}
              </div>
              <InputText
                id="phone"
                placeholder={t("profileField.phone.placeholder", {
                  ns: "profile",
                })}
                aria-describedby="username-help"
                className="w-[100%]"
                value={phoneNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%] ">
              <label htmlFor="email">
                {t("profileField.email.label", { ns: "profile" })}
              </label>
              <InputText
                id="email"
                placeholder={t("profileField.email.placeholder", {
                  ns: "profile",
                })}
                aria-describedby="username-help"
                className="w-[100%]"
                disabled
                value={userProfile.email}
              />
            </div>
            <Button
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
                <span>{t("profileField.updateButton", { ns: "profile" })}</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
