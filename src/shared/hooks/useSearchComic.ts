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
  const buildParams = () => {
    let params = [];

    if (comicName !== "") {
      params.push(`comicName=${comicName}`);
    }

    if (filterAuthor?.length !== 0) {
      params.push(`filterAuthor=${filterAuthor}`);
    }

    if (filterGenres?.length !== 0) {
      params.push(`filterGenres=${filterGenres}`);
    }
    if (filterState) {
      params.push(`filterState=${filterState?.name}`);
    }
    if (filterSort) {
      params.push(`filterSort=${filterSort?.code}`);
    }

    return params.length !== 0 ? `?${params.join("&")}` : "";
  };

  const searchComics = async () => {
    window.history.pushState({}, "", buildParams());

    const { data } = await ComicService.searchComics({
      name: comicName,
      author: filterAuthor,
      orderBy: filterSort?.code ?? "updatedAt",
      status: filterState?.name,
      genres: filterGenres,
      page,
      size,
    });

    return data.comics;
  };

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
    searchComics,
    comics,
    isLoading,
    error,
  };
};
