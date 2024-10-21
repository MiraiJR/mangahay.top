import LoginImage from "@/shared/assets/login.webp";
import { InputText } from "primereact/inputtext";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import { useRegister } from "./useRegister";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
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
  const { oppositeTheme } = useContext(ThemeContext);
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
            className={`text-center text-4xl font-bold mb-5 text-${oppositeTheme}`}
          >
            {t("register.label", { ns: "auth" }).toLocaleUpperCase()}
          </div>
          {errorMessage && (
            <small id="username-help" className="text-red-400">
              {errorMessage}
            </small>
          )}
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname" className={`text-${oppositeTheme}`}>
                {t("fullName.label", { ns: "auth" })}
              </label>
              <InputText
                placeholder={t("fullName.placeholder", { ns: "auth" })}
                id="fullname"
                aria-describedby="username-help"
                className="w-[455px] mobile:w-[235px]"
                type="text"
                value={fullname}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFullname(event.target.value)
                }
              />
            </div>
          </div>
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={`text-${oppositeTheme}`}>
                {t("email.label", { ns: "auth" })}
              </label>
              <InputText
                placeholder={t("email.placeholder", { ns: "auth" })}
                id="email"
                type="email"
                aria-describedby="username-help"
                className="w-[455px] mobile:w-[235px]"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />
            </div>
          </div>
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className={`text-${oppositeTheme}`}>
                {t("password.label", { ns: "auth" })}
              </label>
              <InputText
                type="password"
                id="password"
                placeholder={t("password.placeholder", { ns: "auth" })}
                aria-describedby="username-help"
                className="mobile:w-[235px] w-[455px]"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className={`text-${oppositeTheme}`}
              >
                {t("confirmPassword.label", { ns: "auth" })}
              </label>
              <InputText
                type="password"
                id="confirmPassword"
                placeholder={t("confirmPassword.placeholder", { ns: "auth" })}
                aria-describedby="username-help"
                className="mobile:w-[235px] w-[455px]"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              hrefLang="vi"
              rel="preload"
              href={"/dang-nhap"}
              className="text-red-600 font-bold float-right"
            >
              {t("login.label", { ns: "auth" })}
            </Link>
          </div>
          <button className="btn-primary p-4" onClick={() => handleRegister()}>
            {t("register.label", { ns: "auth" })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
