import { usePagination } from "@/shared/hooks/usePagination";
import { useSearchComic } from "@/shared/hooks/useSearchComic";
import ComicService from "@/shared/services/comicService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useSearchState = () => {
  const [comicName, setComicName] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterState, setFilterState] = useState<OptionStatus | null>(null);
  const [filterSort, setFilterSort] = useState<OptionSort | null>(null);
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const [initialComicsResult, setInitialComicsResult] = useState<any[]>([]);

  const { page, setPage, size, setSize } = usePagination();
  const router = useRouter();
  const {
    filterAuthor: filterAuthorFromUrl,
    filterGenres: filterGenresFromUrl,
    comicName: comicNameFromUrl,
    filterState: filterStateFromUrl,
  } = router.query;

  useEffect(() => {
    if (filterStateFromUrl && typeof filterStateFromUrl === "string") {
      setFilterState({
        name: filterStateFromUrl,
      });
    }

    if (filterAuthorFromUrl && typeof filterAuthorFromUrl === "string") {
      setFilterAuthor(filterAuthorFromUrl);
    }

    if (filterGenresFromUrl && typeof filterGenresFromUrl === "string") {
      setFilterGenres(filterGenresFromUrl.split(","));
    }

    if (comicNameFromUrl && typeof comicNameFromUrl === "string") {
      setComicName(comicNameFromUrl);
    }
  }, [router]);

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

  useEffect(() => {
    (async () => {
      const comics = await searchComics();
      setInitialComicsResult(comics);
    })();
  }, []);

  return {
    comicName,
    setComicName,
    filterAuthor,
    setFilterAuthor,
    filterState,
    setFilterState,
    filterSort,
    setFilterSort,
    filterGenres,
    setFilterGenres,
    showAdvancedSearch,
    setShowAdvancedSearch,
    handleSearchComic: searchComics,
    initialComicsResult,
  };
};
