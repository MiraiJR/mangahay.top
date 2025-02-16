import LoginImage from "@/shared/assets/login.webp";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import { useRegister } from "./usePageState";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/components/base-components";
import { Button } from "antd";

export const Body = () => {
  const {
    errorMessage,
    password,
    setPassword,
    email,
    setEmail,
    confirmPassword,
    setConfirmPassword,
    fullname,
    setFullname,
    handleRegister,
  } = useRegister();
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("register.label", { ns: "auth" })}</title>
        <meta property="og:type" content="website"></meta>
      </Helmet>
      <div className="flex justify-center items-center">
        <Image
          priority
          className="mobile:hidden"
          src={LoginImage}
          alt={t("register.label", { ns: "auth" })}
          width={300}
        />
        <div className="flex flex-col gap-4">
          <div
            className={`text-center text-4xl font-bold mb-5 text-${oppositeTheme} mobile:text-2xl`}
          >
            {t("register.label", { ns: "auth" }).toLocaleUpperCase()}
          </div>
          {errorMessage && (
            <small id="username-help" className="text-red-400 mobile:text-xs">
              {errorMessage}
            </small>
          )}
          <Input
            label={t("fullName.label", { ns: "auth" })}
            placeholder={t("fullName.placeholder", { ns: "auth" })}
            id="fullname"
            className="w-[455px] mobile:w-[235px]"
            type="text"
            value={fullname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFullname(event.target.value)
            }
            required
          />
          <Input
            label={t("email.label", { ns: "auth" })}
            placeholder={t("email.placeholder", { ns: "auth" })}
            id="email"
            type="email"
            className="w-[455px] mobile:w-[235px]"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            required
          />
          <Input
            label={t("password.label", { ns: "auth" })}
            type="password"
            id="password"
            placeholder={t("password.placeholder", { ns: "auth" })}
            className="mobile:w-[235px] w-[455px]"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <Input
            label={t("confirmPassword.label", { ns: "auth" })}
            type="password"
            id="confirmPassword"
            placeholder={t("confirmPassword.placeholder", { ns: "auth" })}
            className="mobile:w-[235px] w-[455px]"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
          <div className="flex justify-between items-center">
            <Link
              href={"/dang-nhap"}
              className="text-blue-400 float-left mobile:text-xs"
            >
              {t("login.label", { ns: "auth" })}
            </Link>
            <Button
              color="primary"
              variant="solid"
              className="w-fit"
              onClick={() => handleRegister()}
            >
              {t("register.label", { ns: "auth" })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
