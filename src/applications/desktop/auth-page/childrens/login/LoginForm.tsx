import LoginImage from "@/shared/assets/login.webp";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "./useLogin";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { InputTextCustom } from "@/shared/components/base-components/input-text/InputTextCustom";
import { Button } from "primereact/button";

const LoginForm = () => {
  const {
    password,
    setPassword,
    email,
    setEmail,
    handleLogin,
    error,
    isLoading,
  } = useLogin();
  const { oppositeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("login.label", { ns: "auth" })}</title>
        <meta property="og:type" content="website"></meta>
      </Helmet>
      <div className="flex justify-center items-center">
        <Image
          priority
          className="mobile:hidden"
          src={LoginImage}
          alt={t("login.label", { ns: "auth" })}
          width={300}
        />
        <div className="flex flex-col gap-4">
          <div
            className={`text-center text-4xl font-bold mb-5 text-${oppositeTheme}`}
          >
            {t("login.label", { ns: "auth" }).toLocaleUpperCase()}
          </div>
          {error && (
            <small id="username-help" className="text-red-400">
              {error.message}
            </small>
          )}
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className={`text-${oppositeTheme}`}>
                {t("email.label", { ns: "auth" })}
              </label>
              <InputTextCustom
                name={"username"}
                placeholder={t("email.placeholder", { ns: "auth" })}
                value={email}
                onChange={function (
                  event: React.ChangeEvent<HTMLInputElement>
                ): void {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className={`text-${oppositeTheme}`}>
                {t("password.label", { ns: "auth" })}
              </label>
              <InputTextCustom
                name={"password"}
                type={"password"}
                placeholder={t("password.placeholder", { ns: "auth" })}
                value={password}
                onChange={function (
                  event: React.ChangeEvent<HTMLInputElement>
                ): void {
                  setPassword(event.target.value);
                }}
              />
              <small id="username-help" className="text-red-400"></small>
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              rel="preload"
              hrefLang="vi"
              href={"/dang-ky"}
              className="text-red-600 font-bold"
            >
              {t("register.label", { ns: "auth" })}
            </Link>
            <Link
              rel="preload"
              hrefLang="vi"
              href={"/quen-mat-khau"}
              className="text-blue-400"
            >
              {t("forgetPassword.label", { ns: "auth" })}
            </Link>
          </div>
          <Button
            label={t("login.label", { ns: "auth" })}
            loading={isLoading}
            onClick={() => handleLogin()}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
