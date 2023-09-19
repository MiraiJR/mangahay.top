import LoginImage from "@/shared/assets/login.png";
import authService from "@/shared/services/authService";
import themeStore from "@/shared/stores/themeStore";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const title = "Đăng ký";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");

  const handleRegister = async () => {
    try {
      if (
        email.trim() === "" ||
        confirmPassword.trim() === "" ||
        fullname.trim() === "" ||
        password.trim() === ""
      ) {
        throw new Error("Vui điền đầy đủ thông tin!");
      }

      if (confirmPassword !== password) {
        throw new Error("Nhập lại mật khẩu không khớp!");
      }

      const { data } = await authService.register({
        password,
        email,
        fullname,
      });

      toast.success(data);
      window.location.href = "/dang-nhap";
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta property="og:type" content="website"></meta>
      </Helmet>
      <div className="flex justify-center items-center">
        <img
          className="mr-2 mobile:hidden"
          src={LoginImage}
          alt="Đăng nhập"
          width={300}
        />
        <div className="flex flex-col gap-4">
          <h1
            className={`text-center text-4xl font-bold mb-5 text-${themeStore.getOppositeTheme()}`}
          >
            {title.toLocaleUpperCase()}
          </h1>
          {errorMessage && (
            <small id="username-help" className="text-red-400">
              {errorMessage}
            </small>
          )}
          <div className="card flex justify-content-center">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Họ và tên
              </label>
              <InputText
                placeholder="Nhập họ và tên"
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
              <label
                htmlFor="email"
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Email
              </label>
              <InputText
                placeholder="Nhập địa chỉ email"
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
              <label
                htmlFor="password"
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Mật khẩu
              </label>
              <InputText
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
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
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Nhập lại mật khẩu
              </label>
              <InputText
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
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
              to={"/dang-nhap"}
              className="text-red-600 font-bold float-right"
            >
              Đăng nhập
            </Link>
          </div>
          <button className="btn-primary p-4" onClick={handleRegister}>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
