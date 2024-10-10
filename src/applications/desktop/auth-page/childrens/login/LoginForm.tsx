import LoginImage from "@/shared/assets/login.webp";
import { InputText } from "primereact/inputtext";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "./useLogin";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const title = "Đăng nhập";

const LoginForm = () => {
  const { password, setPassword, email, setEmail, errorMessage, handleLogin } =
    useLogin();
  const { oppositeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
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
            {title.toLocaleUpperCase()}
          </div>
          {errorMessage && (
            <small id="username-help" className="text-red-400">
              {errorMessage}
            </small>
          )}
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className={`text-${oppositeTheme}`}>
                {t("email.label", { ns: "auth" })}
              </label>
              <InputText
                id="username"
                placeholder={t("email.placeholder", { ns: "auth" })}
                aria-describedby="username-help"
                className="mobile:w-[235px] w-[455px]"
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
          <button className="btn-primary p-4" onClick={() => handleLogin()}>
            {t("login.label", { ns: "auth" })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
