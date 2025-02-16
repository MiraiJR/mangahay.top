import { useThemeContext } from "../../../contexts/ThemeContext";
import { Spin } from "antd";
import { MainLogo } from "../logo/MainLogo";

export const LoadingFullPage = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`h-screen w-screen bg-${theme} flex flex-col items-center justify-center gap-2`}
    >
      <MainLogo />
      <Spin size="large" />
    </div>
  );
};
