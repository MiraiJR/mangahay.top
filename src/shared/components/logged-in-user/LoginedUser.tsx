import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { reduceQualityImage } from "../../helpers/helpers";
import { AdminFeature } from "./AdminFeature";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { Notification } from "./Notification";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { LoggoutButton } from "./LogoutButton";
import { useGetMyProfile } from "@/shared/hooks/useGetMyProfile";
import { useTranslation } from "react-i18next";

const LoginedUser = () => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const {
    elementRef: menuProfileRef,
    isVisiable: showMenu,
    setIsVisiable: setShowMenu,
  } = useClickOutside();
  const { myProfile } = useGetMyProfile();
  const { t } = useTranslation();

  return (
    <div className="relative cursor-pointer desktop:ml-10 flex gap-4">
      <Notification />
      <div ref={menuProfileRef}>
        {myProfile && (
          <Image
            width={50}
            height={0}
            className="mobile:w-[36px] w-[50px] mobile:h-[36px] h-[50px] object-cover rounded"
            src={reduceQualityImage(myProfile.avatar)}
            alt={myProfile.fullname}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
        {showMenu && (
          <div
            style={{ zIndex: "9999" }}
            className={`rounded-sm p-4 shadow-outer-lg-${oppositeTheme} absolute top-max right-0 flex items-center text-center bg-${theme} w-max`}
          >
            <ul className="flex flex-col">
              {myProfile && (
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
