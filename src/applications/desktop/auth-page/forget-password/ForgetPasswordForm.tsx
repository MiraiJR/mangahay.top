import MetaTags from "@/shared/components/MetaTags";
import LoginImage from "@/shared/assets/login.webp";
import Image from "next/image";
import themeStore from "@/shared/stores/themeStore";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import AuthService from "@/shared/services/authService";

const ForgetPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [titleButton, setTitleButton] = useState<string>("Quên mật khẩu");
  const handleForgetPassword = async () => {
    if (email.trim() === "") {
      setErrorMessage("Vui lòng nhập địa chỉ email!");
      return;
    }

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      setErrorMessage("Vui lòng nhập đúng cấu trúc mail!");
      return;
    }

    setErrorMessage(null);

    try {
      const { data } = await AuthService.forgetPassword(email);
      toast.success(data);
      setTitleButton("Gửi lại");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <MetaTags
        title={"Quên mật khẩu - mangahay"}
        description={"Trang quên mật khẩu"}
        image={""}
        url={"https://mangahay.top/quen-mat-khau"}
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
              {"Quên mật khẩu".toLocaleUpperCase()}
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
                placeholder="Nhập email"
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
