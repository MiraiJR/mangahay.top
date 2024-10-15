import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { Skeleton } from "primereact/skeleton";
import { useContext } from "react";

export const CardComicSkeleton = () => {
  const { oppositeTheme } = useContext(ThemeContext);
  return (
    <div className={`flex flex-col capitalize text-${oppositeTheme}`}>
      <Skeleton height="15rem" className="mb-2 w-[100%]"></Skeleton>
      <Skeleton height="1rem" className="mb-2 w-[100%]"></Skeleton>
      <Skeleton height="1rem" className="mb-2 w-[100%]"></Skeleton>
      <Skeleton height="1rem" className="mb-2 w-[100%]"></Skeleton>
    </div>
  );
};
