import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

interface SearchComicParams {
  comicName?: string;
  filterAuthor?: string;
  filterSort?: OptionSort;
  filterState?: OptionStatus;
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
    let params = "?";

    if (comicName !== "") {
      params += `comicName=${comicName}`;
    }

    if (filterAuthor?.length !== 0) {
      params += `filterAuthor=${filterAuthor}`;
    }

    if (filterGenres?.length !== 0) {
      params += `filterGenres=${filterGenres}`;
    }
    if (filterState) {
      params += `filterState=${filterState?.name}`;
    }
    if (filterSort) {
      params += `filterSort=${filterSort?.code}`;
    }

    if (params === "?") {
      params = "";
    }

    return params;
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
