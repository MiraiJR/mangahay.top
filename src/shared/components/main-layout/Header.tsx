import LogoWeb from "@/shared/assets/logo.webp";
import LogoWebLight from "@/shared/assets/logo-light.webp";
import { UserCircle2 } from "lucide-react";
import { useState, useContext } from "react";
import LoginedUser from "../logged-in-user/LoginedUser";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import themeStore from "@/shared/stores/theme-storage";
import Image from "next/image";
import Link from "next/link";
import { SearchComic } from "./components/search-comic/SearchComic";
import { LeftMenu } from "./components/left-menu/LeftMenu";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/shared/hooks/useLogin";
import { FlagCountries } from "../flag-country/FlagCountries";

const Header = () => {
  const { t } = useTranslation();
  const { isLogined } = useLogin();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checkedChangeTheme, setCheckedChangeTheme] = useState<boolean>(
    themeStore.getTheme() === "light" ? false : true
  );

  return (
    <div
      className={`container mx-auto bg-${theme} text-${themeStore.getOppositeTheme()} p-5 flex justify-between items-center relative`}
    >
      <div className="flex items-center gap-5 font-medium text-lg">
        <Link href="/" hrefLang="vi">
          <Image
            priority
            width={0}
            height={100}
            className="mobile:h-[50px] mobile:w-fit h-[100px]"
            src={theme === "light" ? LogoWeb : LogoWebLight}
            alt="mangahay.top logo"
          />
        </Link>
        <LeftMenu />
      </div>
      <div className="card flex flex-wrap items-center justify-content-center gap-3">
        <FlagCountries />
        <div className="flex items-center gap-2 mobile:hidden">
          <label htmlFor="theme">{t(`theme.${theme}`, { ns: "common" })}</label>
          <InputSwitch
            id="theme"
            checked={checkedChangeTheme}
            onChange={(e: InputSwitchChangeEvent) => {
              toggleTheme();
              setCheckedChangeTheme(e.value ?? true);
            }}
          />
        </div>
        <SearchComic />
        {isLogined ? (
          <LoginedUser />
        ) : (
          <Link href="/dang-nhap" hrefLang="vi">
            <button
              className={`desktop:rounded-full mobile:rounded mobile:p-2 py-2 px-4 font-bold bg-${themeStore.getOppositeTheme()} text-${theme}`}
            >
              <UserCircle2 size={20} className="desktop:hidden" />
              <span className="mobile:hidden">
                {t("login.label", { ns: "auth" })}
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
