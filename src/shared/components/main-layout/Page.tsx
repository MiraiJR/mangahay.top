import { useEffect, useState, useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { cn } from "@/shared/libs/utils";
import { ArrowUpCircle } from "lucide-react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";

const MainLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const {} = useContext(ThemeContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setIsScroll(true);
        return;
      }
      if (window.scrollY === 0) {
        setIsScroll(false);
        return;
      }
    });
  }, []);
  return (
    <div
      id="main-layout"
      className={`min-h-screen relative bg-${themeStore.getTheme()} ${className}`}
    >
      <div
        className={cn(
          `bg-${themeStore.getTheme()} relative drop-shadow-lg z-50`
        )}
      >
        <Header />
      </div>
      <div className={cn("container relative mx-auto my-10 mobile:p-2")}>
        {children}
      </div>
      <div className="bg-slate-200">
        <Footer />
      </div>
      {isScroll && (
        <div
          className={`fixed bottom-0 m-4 right-0 cursor-pointer z-50`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpCircle
            size={50}
            color={themeStore.getTheme() === "light" ? "black" : "white"}
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
