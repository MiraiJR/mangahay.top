import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import comicService from "../services/comicService";
import { ThemeContext } from "../contexts/ThemeContext";
import themeStore from "../stores/themeStore";
import { ProgressSpinner } from "primereact/progressspinner";
import MyLoading from "./MyLoading";

const ListGenres = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);

      try {
        const { data } = await comicService.getGenres();
        setGenres(data);
        setIsLoading(false);
      } catch (error: any) {}
    };
    getGenres();
  }, []);
  return (
    <div
      className={`grid grid-cols-4 mobile:grid-cols-3 mobile:max-h-[300px] mobile:w-screen mobile:overflow-y-scroll gap-2 shadow-outer-lg-${themeStore.getOppositeTheme()} bg-${theme} p-2 z-10`}
    >
      {isLoading ? (
        <MyLoading />
      ) : genres.length !== 0 ? (
        genres.map((genre) => (
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
        <span className="col-span-4 mobile:col-span-3">Không có thể loại</span>
      )}
    </div>
  );
};

export default ListGenres;
