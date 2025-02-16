import MetaTags from "@/shared/components/MetaTags";
import LoginImage from "@/shared/assets/login.webp";
import Image from "next/image";
import { originalURL } from "@/shared/libs/config";
import { useTranslation } from "react-i18next";
import { useForgetPassword } from "./usePageState";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Button } from "antd";
import { Input } from "@/shared/components/base-components";

export const Body = () => {
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();
  const {
    email,
    setEmail,
    titleButton,
    handleForgetPassword,
    error,
    isLoading,
  } = useForgetPassword();

  return (
    <div>
      <MetaTags
        title={"Quên mật khẩu - mangahay"}
        description={"Trang quên mật khẩu"}
        image={""}
        url={`${originalURL}/quen-mat-khau`}
      />
      <div className="flex justify-center items-center">
        <Image
          priority
          className="mobile:hidden"
          src={LoginImage}
          alt="Đăng nhập"
          width={300}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div
              className={`text-center text-4xl mobile:text-2xl font-bold mb-5 text-${oppositeTheme}`}
            >
              {t("forgetPassword.forgetPassword", {
                ns: "auth",
              }).toLocaleUpperCase()}
            </div>
            {error && (
              <small id="username-help" className="text-red-400 mobile:text-xs">
                {error.message}
              </small>
            )}
          </div>
          <div className="card flex flex-col justify-content-center w-[100%] gap-4">
            <Input
              label="Email"
              id="email"
              placeholder={t("forgetPassword.inputEmail", { ns: "auth" })}
              className="mobile:w-[100%] w-[455px] text-sm py-2"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              required
            />
            <Button
              className="h-[40px] mobile:text-xs w-fit"
              variant="solid"
              type="primary"
              onClick={() => handleForgetPassword()}
              loading={isLoading}
            >
              {titleButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
