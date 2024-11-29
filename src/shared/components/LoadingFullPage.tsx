import { ProgressSpinner } from "primereact/progressspinner";
import { useThemeContext } from "../contexts/ThemeContext";

export const LoadingFullPage = () => {
  const { theme } = useThemeContext();
  return (
    <div className={`h-screen w-screen  bg-${theme}`}>
      <ProgressSpinner
        className="fixed top-1/2 left-1/2"
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};
