import { ArrowUpCircle } from "lucide-react";
import { useScrollToTop } from "./useScrollToTop";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

export const ScrollToTop = () => {
  const { isScroll } = useScrollToTop();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {isScroll && (
        <div
          className={`fixed bottom-0 m-4 right-0 cursor-pointer z-50`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpCircle
            size={50}
            color={theme === "light" ? "black" : "white"}
          />
        </div>
      )}
    </>
  );
};
