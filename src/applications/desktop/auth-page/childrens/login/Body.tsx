import LoginImage from "@/shared/assets/login.webp";
import { Helmet } from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "./usePageState";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { GoogleLoginButton } from "@/shared/components/socials/google/GoogleLoginButton";
import { Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "@/shared/components/base-components";

export const Body = () => {
  const {
    password,
    setPassword,
    email,
    setEmail,
    handleLogin,
    error,
    isLoading,
  } = useLogin();
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <div className="text-xs">
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
            className={`text-center text-4xl mobile:text-2xl font-bold mb-5 text-${oppositeTheme}`}
          >
            {t("login.label", { ns: "auth" }).toLocaleUpperCase()}
          </div>
          {error && (
            <small id="username-help" className="text-red-400">
              {error.message}
            </small>
          )}
          <Input
            label={t("email.label", { ns: "auth" })}
            className="text-sm py-2"
            id="email"
            placeholder={t("email.placeholder", { ns: "auth" })}
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            required
          />
          <Input
            label={t("password.label", { ns: "auth" })}
            className="text-sm py-2"
            id="email"
            required
            placeholder={t("password.placeholder", { ns: "auth" })}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            type="password"
          />

          <div className="flex justify-between">
            <Link href={"/dang-ky"} className="text-red-600 font-bold">
              {t("register.label", { ns: "auth" })}
            </Link>
            <Link href={"/quen-mat-khau"} className="text-blue-400">
              {t("forgetPassword.label", { ns: "auth" })}
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Button
              className="h-[40px] w-fit"
              variant="solid"
              type="primary"
              loading={isLoading}
              onClick={() => handleLogin()}
            >
              {t("login.label", { ns: "auth" })}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1>Đăng nhập bằng:</h1>
            <div>
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
