import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

interface SearchComicParams {
  comicName?: string;
  filterAuthor?: string;
  filterSort?: OptionSort | null;
  filterState?: OptionStatus | null;
  filterGenres?: string[];
  page?: number;
  size?: number;
}

export const useSearchComic = ({
  comicName,
  filterAuthor,
  filterSort,
  filterState,
  filterGenres,
  page,
  size,
}: SearchComicParams) => {
  const {
    data: comics = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "comic.search",
      {
        comicName,
        filterAuthor,
        filterSort,
        filterState,
        filterGenres,
        page,
        size,
      },
    ],
    queryFn: async () => {
      const { data } = await ComicService.searchComics({
        name: comicName,
        author: filterAuthor,
        orderBy: filterSort?.code,
        status: filterState?.name,
        genres: filterGenres,
        page,
        size,
      });

      return data.comics;
    },
  });

  return {
    comics,
    isLoading,
    error,
  };
};
