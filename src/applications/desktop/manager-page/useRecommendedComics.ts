import { useEffect, useState } from "react";
import { useGetMyCreatedComic } from "./useGetMyCreatedComic";

export const useRecommendedComics = () => {
  const { comics } = useGetMyCreatedComic();
  const [recommendedComics, setRecommendedComics] = useState<String[]>([]);

  useEffect(() => {
    if (comics.length !== 0) {
      setRecommendedComics(comics.map((comic) => `${comic.id}/${comic.name}`));
    }
  }, [comics]);

  const handleSearchRecommendedComics = (query: string) => {
    setRecommendedComics(
      recommendedComics.filter((comicName) => comicName.includes(query))
    );
  };

  return {
    recommendedComics,
    handleSearchRecommendedComics,
  };
};
