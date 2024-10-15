import MyLoading from "@/shared/components/MyLoading";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import { cn } from "@/shared/libs/utils";
import { useParams } from "next/navigation";
import { useContext } from "react";

export const ListGenre = () => {
  const { genre } = useParams();
  const currentGenre = genre ?? null;
  const { oppositeTheme } = useContext(ThemeContext);
  const { genres, isLoading } = useGetGenres();

  return (
    <div className={`col-span-4 mobile:col-span-12`}>
      <div className={`border border-${oppositeTheme} text-${oppositeTheme}`}>
        <h2 className={`font-bold p-2 border border-b-${oppositeTheme}`}>
          Thể loại
        </h2>
        {isLoading ? (
          <MyLoading />
        ) : (
          genres.map((genre) => (
            <a
              href={`/the-loai/${genre.slug}`}
              title={genre.name}
              key={genre.slug}
              className={cn(
                "p-1 cursor-pointer hover:bg-slate-500 hover:text-red-400 mobile:text-sm",
                {
                  "bg-slate-500 text-red-400":
                    currentGenre &&
                    (currentGenre === genre.slug ||
                      currentGenre === genre.name),
                }
              )}
              hrefLang="vi"
            >
              {genre.name}
            </a>
          ))
        )}
      </div>
    </div>
  );
};
