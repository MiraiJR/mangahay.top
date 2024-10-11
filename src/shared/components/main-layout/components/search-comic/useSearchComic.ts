import ComicService from "@/shared/services/comicService";
import { useState } from "react";

export const useSearchComic = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Comic[]>([]);

  const handleSearchComic = async (comicName: string) => {
    if (comicName.trim() === "") {
      setSearchResult([]);
      setIsShowSearchResult(false);
      return;
    }

    try {
      const { data } = await ComicService.searchComics({
        comicName,
        page: 1,
        limit: 10,
      });

      setSearchResult(data.comics);
    } catch (error: any) {}
  };

  const reset = () => {
    setInputSearch("");
  };

  return {
    inputSearch,
    setInputSearch,
    searchResult,
    isShowSearchResult,
    setIsShowSearchResult,
    handleSearchComic,
    reset,
  };
};
