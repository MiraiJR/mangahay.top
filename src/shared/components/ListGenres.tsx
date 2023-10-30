import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import comicService from "../services/comicService";
import { ThemeContext } from "../contexts/ThemeContext";
import themeStore from "../stores/themeStore";
import { ProgressSpinner } from "primereact/progressspinner";

const ListGenres = () => {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await comicService.getGenres();
        setGenres(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getGenres();
  }, []);
  return (
    <div
      className={`grid grid-cols-4 mobile:grid-cols-3 mobile:max-h-[300px] mobile:w-screen mobile:overflow-y-scroll gap-2 shadow-outer-lg-${themeStore.getOppositeTheme()} bg-${theme} p-2 z-10`}
    >
      {genres ? (
        genres?.map((genre) => (
          <a
            href={`/tim-kiem?filterGenres=${genre.slug}`}
            title={genre.name}
            key={genre.slug}
            className="p-1 cursor-pointer hover:bg-slate-500 hover:text-red-400 mobile:text-sm"
            hrefLang="vi"
          >
            {genre.name}
          </a>
        ))
      ) : (
        <div className="flex items-center justify-center w-[100%] col-span-12">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
    </div>
  );
};

export default ListGenres;
