import { useEffect, useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { cn } from "@/shared/libs/utils";
import { globalStore } from "@/shared/stores/global-storage";
import { ScrollToTop } from "./components/scroll-to-top/ScrollToTop";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { MOBILE_MAX_SIZE_SCREEN } from "@/shared/settings/CommonConfig";

const MainLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { setIsMobile } = globalStore();
  const { theme, oppositeTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_MAX_SIZE_SCREEN);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="main-layout"
      className={`min-h-screen relative bg-${theme} ${className}`}
    >
      <div className={cn(`bg-${theme} relative drop-shadow-lg z-50`)}>
        <Header />
      </div>
      <div className={cn("container relative mx-auto my-10 mobile:p-2")}>
        {children}
      </div>
      <div className={`bg-${theme} border-t-${oppositeTheme} border-2`}>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
