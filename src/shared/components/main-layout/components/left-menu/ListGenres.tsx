import MyLoading from "@/shared/components/MyLoading";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import themeStore from "@/shared/stores/theme-storage";

const ListGenres = () => {
  const { genres, isLoading } = useGetGenres();
  const { theme } = useThemeContext();

  if (isLoading) {
    return <MyLoading />;
  }

  return (
    <div
      className={`grid grid-cols-4 mobile:grid-cols-3 mobile:max-h-[300px] mobile:w-screen mobile:overflow-y-scroll gap-2 shadow-outer-lg-${themeStore.getOppositeTheme()} bg-${theme} p-2 z-10`}
    >
      {genres.map((genre) => (
        <a
          href={`/tim-kiem?filterGenres=${genre.slug}`}
          title={genre.name}
          key={genre.slug}
          className="p-1 cursor-pointer hover:bg-slate-500 hover:text-red-400 mobile:text-sm"
          hrefLang="vi"
        >
          {genre.name}
        </a>
      ))}
    </div>
  );
};

export default ListGenres;
