import { useSearchComic } from "@/shared/hooks/useSearchComic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useSearchState = () => {
  const [comicName, setComicName] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterState, setFilterState] = useState<OptionStatus | null>(null);
  const [filterSort, setFilterSort] = useState<OptionSort | null>(null);
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

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

  const { searchComics, comics } = useSearchComic({
    comicName,
    filterAuthor,
    filterSort,
    filterState,
    filterGenres,
    page: 1,
    size: 16,
  });

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
    initialSearchResult: comics,
  };
};
