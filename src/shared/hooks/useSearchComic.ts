import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

interface SearchComicParams {
  comicName?: string;
  filterAuthor?: string;
  filterSort?: OptionSort;
  filterState?: OptionStatus;
  filterGenres?: string[];
  page?: number;
  limit?: number;
}

export const useSearchComic = ({
  comicName,
  filterAuthor,
  filterSort,
  filterState,
  filterGenres,
  page,
  limit,
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
      comicName,
      filterAuthor,
      filterSort: filterSort?.code,
      filterState: filterState?.name,
      filterGenres,
      page,
      limit,
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
        limit,
      },
    ],
    queryFn: async () => {
      const { data } = await ComicService.searchComics({
        comicName,
        filterAuthor,
        filterSort: filterSort?.code,
        filterState: filterState?.name,
        filterGenres,
        page,
        limit,
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
