import MetaTags from "@/shared/components/MetaTags";
import LoginImage from "@/shared/assets/login.webp";
import Image from "next/image";
import themeStore from "@/shared/stores/themeStore";
import { originalURL } from "@/shared/libs/config";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { useForgetPassword } from "./useForgetPassword";

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { email, setEmail, errorMessage, titleButton, handleForgetPassword } =
    useForgetPassword();

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
              className={`text-center text-4xl font-bold mb-5 text-${themeStore.getOppositeTheme()}`}
            >
              {t("forgetPassword.forgetPassword", {
                ns: "auth",
              }).toLocaleUpperCase()}
            </div>
            {errorMessage && (
              <small id="username-help" className="text-red-400">
                {errorMessage}
              </small>
            )}
          </div>
          <div className="card flex flex-col justify-content-center w-[100%] gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Email
              </label>
              <InputText
                id="email"
                type="email"
                placeholder={t("forgetPassword.inputEmail", { ns: "auth" })}
                aria-describedby="username-help"
                className="mobile:w-[100%] w-[455px]"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />
            </div>
            <button className="btn-primary p-4" onClick={handleForgetPassword}>
              {titleButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
