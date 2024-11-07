import { useState } from "react";
import ComicService from "../services/comicService";

export const useRecommendedComicByName = () => {
  const [recommendedComics, setRecommendedComics] = useState<string[]>([]);

  const handleSearch = async (comicName: string) => {
    const { data } = await ComicService.searchComics({ name: comicName });
    setRecommendedComics(
      data.comics.map((comic) => `${comic.id}/${comic.name}`)
    );
  };

  return {
    handleGetRecommendedComics: handleSearch,
    recommendedComics,
  };
};
