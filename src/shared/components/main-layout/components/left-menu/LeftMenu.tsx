import { ChevronDown } from "lucide-react";
import { useLeftMenu } from "./useLeftMenu";
import ListGenres from "@/shared/components/main-layout/components/left-menu/ListGenres";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

export const LeftMenu = () => {
  const { leftMenuData, showListGenres, genreRef } = useLeftMenu();
  const { oppositeTheme } = useContext(ThemeContext);
  return (
    <div>
      <div className="flex gap-4 mobile:gap-1">
        {leftMenuData.map((item) => (
          <div
            className={`flex items-center cursor-pointer border-b-2 border-transparent hover:border-${
              oppositeTheme === "light" ? "white" : "black"
            } transition-all duration-300`}
            key={item.id}
            onClick={item.handle}
          >
            <span className="mobile:hidden">{item.label}</span>
            {item.Icon && <item.Icon size={30} className="desktop:hidden" />}
            {item.isChevronDown && (
              <ChevronDown size={15} className="mobile:hidden" />
            )}
          </div>
        ))}
      </div>
      {showListGenres && (
        <div
          className="absolute z-50 top-full w-max desktop:top-3/4 mobile:left-0"
          ref={genreRef}
        >
          <ListGenres />
        </div>
      )}
    </div>
  );
};
