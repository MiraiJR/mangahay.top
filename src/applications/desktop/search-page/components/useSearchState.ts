import { usePaginationState } from "@/shared/hooks/usePaginationState";
import ComicService from "@/shared/services/comicService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useSearchState = () => {
  const [comicName, setComicName] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterState, setFilterState] = useState<string>("Đang tiến hành");
  const [filterSort, setFilterSort] = useState<string>("updatedAt");
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const [initialComicsResult, setInitialComicsResult] = useState<any[]>([]);
  const [shouldRunInitialComicsResult, setShouldRunInitialComicsResult] =
    useState<boolean>(false);

  const { page, size } = usePaginationState({});
  const router = useRouter();
  const {
    filterAuthor: filterAuthorFromUrl,
    filterGenres: filterGenresFromUrl,
    comicName: comicNameFromUrl,
    filterState: filterStateFromUrl,
    filterSort: filterSortCodeFromUrl,
  } = router.query;

  useEffect(() => {
    let shouldRun = false;
    if (filterStateFromUrl && typeof filterStateFromUrl === "string") {
      setFilterState(filterStateFromUrl);
      shouldRun = true;
    }

    if (filterAuthorFromUrl && typeof filterAuthorFromUrl === "string") {
      setFilterAuthor(filterAuthorFromUrl);
      shouldRun = true;
    }

    if (filterGenresFromUrl && typeof filterGenresFromUrl === "string") {
      setFilterGenres(filterGenresFromUrl.split(","));
      shouldRun = true;
    }

    if (comicNameFromUrl && typeof comicNameFromUrl === "string") {
      setComicName(comicNameFromUrl);
      shouldRun = true;
    }

    if (filterSortCodeFromUrl && typeof filterSortCodeFromUrl === "string") {
      setFilterSort(filterSortCodeFromUrl);
      shouldRun = true;
    }

    if (shouldRun) {
      setShouldRunInitialComicsResult(true);
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
      params.push(`filterState=${filterState}`);
    }
    if (filterSort) {
      params.push(`filterSort=${filterSort}`);
    }

    return params.length !== 0 ? `?${params.join("&")}` : "";
  };

  const searchComics = async () => {
    window.history.pushState({}, "", buildParams());

    const { data } = await ComicService.searchComics({
      name: comicName,
      author: filterAuthor,
      orderBy: (filterSort as OrderByOption) ?? "updatedAt",
      status: filterState ?? "",
      genres: filterGenres,
      page,
      size,
    });

    return data.comics;
  };

  useEffect(() => {
    if (shouldRunInitialComicsResult) {
      (async () => {
        const comics = await searchComics();
        setInitialComicsResult(comics);
      })();
    }

    return () => {
      setShouldRunInitialComicsResult(false);
    };
  }, [shouldRunInitialComicsResult]);

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
