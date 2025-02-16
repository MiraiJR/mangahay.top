import { ProgressSpinner } from "primereact/progressspinner";
import { userStore } from "@/shared/stores/user-storage";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { UploadImageProvider } from "@/shared/components/base-components/upload-files/UploadImageContext";
import { useUpdateProfile } from "./useUpdateProfile";
import { UserWallPaper } from "../wallpaper/UserWallpaper";
import { UserAvatar } from "../avatar/UserAvatar";
import { Input } from "@/shared/components/base-components";
import { Button } from "antd";

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

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className={`bg-${theme} text-${oppositeTheme} mobile:text-xs`}>
      <div className="relative border">
        <UserWallPaper />
        <UploadImageProvider>
          <UserAvatar />
        </UploadImageProvider>
      </div>
      <div className="mt-[100px] flex flex-col gap-4 items-center">
        <Input
          id="fullname"
          label={t("profileField.displayName.label", { ns: "profile" })}
          value={fullName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFullName(event.target.value)
          }
          placeholder={t("profileField.displayName.placeholder", {
            ns: "profile",
          })}
          className="w-[100%]"
          required
        />
        <Input
          id="phone"
          label={t("profileField.phone.label", { ns: "profile" })}
          value={phoneNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(event.target.value)
          }
          placeholder={t("profileField.phone.placeholder", {
            ns: "profile",
          })}
          className="w-[100%]"
          required={!userProfile.phone}
        />
        <Input
          id="email"
          label={t("profileField.email.label", { ns: "profile" })}
          value={userProfile.email}
          onChange={() => {}}
          placeholder={t("profileField.email.placeholder", {
            ns: "profile",
          })}
          className="w-[100%]"
          required
          disabled
        />
        <Button
          variant="solid"
          color="primary"
          disabled={isLoadingProfile}
          onClick={() => handleUpdateProfile()}
          loading={isLoadingProfile}
        >
          {t("profileField.updateButton", { ns: "profile" })}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
