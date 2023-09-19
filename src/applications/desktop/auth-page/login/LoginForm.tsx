import LoginImage from "@/shared/assets/login.png";
import authService from "@/shared/services/authService";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import JWTManager from "@/shared/libs/jwt";
import { globalState } from "@/shared/stores/globalStore";
import themeStore from "@/shared/stores/themeStore";

const title = "Đăng nhập";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { setIsLogined } = globalState();

  const handleLogin = async () => {
    try {
      if (email.trim() === "") {
        throw new Error("Vui lòng nhập email!");
      }

      if (password.trim() === "") {
        throw new Error("Vui lòng nhập mật khẩu!");
      }

      const { data } = await authService.login({
        password,
        email,
      });

      JWTManager.setToken(data);
      setIsLogined(true);
      navigate("/");
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
          className="mobile:hidden"
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
                htmlFor="username"
                className={`text-${themeStore.getOppositeTheme()}`}
              >
                Email
              </label>
              <InputText
                id="username"
                placeholder="Nhập email"
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
              <small id="username-help" className="text-red-400"></small>
            </div>
          </div>
          <div className="flex justify-between">
            <Link to={"/dang-ky"} className="text-red-600 font-bold">
              Đăng ký
            </Link>
            <Link to={"/quen-mat-khau"} className="text-blue-400">
              Quên mật khẩu?
            </Link>
          </div>
          <button className="btn-primary p-4" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
