import { ChevronDown } from "lucide-react";
import { useLeftMenu } from "./useLeftMenu";
import ListGenres from "@/shared/components/main-layout/components/left-menu/ListGenres";

export const LeftMenu = () => {
  const { leftMenuData, genreRef, showListGenres } = useLeftMenu();
  return (
    <div>
      <div className="flex gap-4 mobile:gap-1">
        {leftMenuData.map((item) => (
          <div
            className="flex items-center cursor-pointer"
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
          ref={genreRef}
          className="absolute z-50 top-full w-max desktop:top-3/4 mobile:left-0"
        >
          <ListGenres />
        </div>
      )}
    </div>
  );
};
