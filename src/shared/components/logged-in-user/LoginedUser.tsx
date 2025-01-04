import Link from "next/link";
import { AdminFeature } from "./AdminFeature";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Notification } from "./Notification";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { LoggoutButton } from "./LogoutButton";
import { useTranslation } from "react-i18next";
import { Avatar } from "primereact/avatar";
import { userStore } from "@/shared/stores/user-storage";

const LoginedUser = () => {
  const { theme, oppositeTheme } = useThemeContext();
  const {
    elementRef: menuProfileRef,
    isVisiable: showMenu,
    setIsVisiable: setShowMenu,
  } = useClickOutside();
  const { userProfile } = userStore();
  const { t } = useTranslation();

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="relative cursor-pointer desktop:ml-10 flex gap-4">
      <Notification />
      <div ref={menuProfileRef}>
        <Avatar
          shape="circle"
          pt={{
            image: {
              className:
                "mobile:w-[36px] w-[50px] mobile:h-[36px] h-[50px] object-cover rounded",
            },
          }}
          icon="pi pi-user"
          image={userProfile.avatar}
          label={userProfile.fullname[0]}
          size="large"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
        {showMenu && (
          <div
            style={{ zIndex: "9999" }}
            className={`rounded-sm p-4 shadow-outer-lg-${oppositeTheme} absolute top-max right-0 flex items-center text-center bg-${theme} w-max`}
          >
            <ul className="flex flex-col">
              {userProfile && (
                <Link
                  rel="preload"
                  href="/me"
                  className="p-2 hover:bg-slate-400"
                  hrefLang="vi"
                >
                  {t("profile.personalInformation", { ns: "common" })}
                </Link>
              )}
              <AdminFeature />
              <LoggoutButton />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginedUser;
