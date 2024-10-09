import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useListComicsOfAuthor = (author: string) => {
  const {
    data: comics = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "comic.author",
      {
        author,
        page: 1,
        limit: 5,
      },
    ],
    queryFn: async () => {
      const { data } = await ComicService.searchComics({
        filterAuthor: author,
        page: 1,
        limit: 5,
      });

      return data.comics;
    },
  });

  return {
    comics,
    isLoading,
    error,
  };
};
