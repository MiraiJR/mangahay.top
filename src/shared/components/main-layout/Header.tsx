import { UserCircle2 } from "lucide-react";
import LoginedUser from "../logged-in-user/LoginedUser";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import Link from "next/link";
import { SearchComic } from "./components/search-comic/SearchComic";
import { LeftMenu } from "./components/left-menu/LeftMenu";
import { useTranslation } from "react-i18next";
import { FlagCountries } from "./components/flag-country/FlagCountries";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { MainLogo } from "../base-components/logo/MainLogo";
import { SwitchTheme } from "./components/SwitchTheme";
import { MobileMenu } from "./components/mobile-menu/MobileMenu";

const Header = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthContext();
  const { theme, oppositeTheme } = useThemeContext();

  return (
    <div className="p-2">
      <div
        className={`container mx-auto bg-${theme} text-${oppositeTheme} p-5 flex justify-between items-center relative`}
      >
        <div className="flex items-center gap-5 font-medium text-lg">
          <MainLogo />
          <LeftMenu />
        </div>
        <div className="card flex flex-wrap items-center justify-content-center gap-3">
          <div className="flex items-center gap-2 mobile:hidden">
            <FlagCountries />
            <SwitchTheme />
          </div>
          <SearchComic />
          {isLoggedIn ? (
            <LoginedUser />
          ) : (
            <Link href="/dang-nhap" hrefLang="vi">
              <button
                className={`desktop:rounded-full mobile:rounded mobile:p-2 py-2 px-4 font-bold bg-${oppositeTheme} text-${theme}`}
              >
                <UserCircle2 size={20} className="desktop:hidden" />
                <span className="mobile:hidden">
                  {t("login.label", { ns: "auth" })}
                </span>
              </button>
            </Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
