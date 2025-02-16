import { useGetGenres } from "@/shared/hooks/useGetGenres";
import Link from "next/link";

export const ListGenres = () => {
  const { genres } = useGetGenres();

  return (
    <div
      className={`grid grid-cols-4 mobile:grid-cols-3 mobile:max-h-[300px] mobile:w-screen mobile:overflow-y-scroll gap-2 z-50`}
    >
      {genres.map((genre) => (
        <Link
          href={`/tim-kiem?filterGenres=${genre.slug}`}
          title={genre.name}
          key={genre.slug}
          className="p-1 cursor-pointer hover:text-red-600 mobile:text-xs "
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
};
