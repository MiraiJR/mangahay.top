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
  } = router.query;

  useEffect(() => {
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

  const { comics } = useSearchComic({
    comicName,
    filterAuthor,
    filterGenres,
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
    initialSearchResult: comics,
  };
};
