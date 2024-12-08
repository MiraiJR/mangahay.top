import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";
import { useState } from "react";

export const useGetListChapter = (comicId: number) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);

  const {
    data = {
      total: 0,
      chapters: [],
    },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comic.chapters", { comicId }],
    queryFn: async () => {
      const { data } = await ComicService.getListChapters(comicId, {
        page,
        size,
      });
      return data;
    },
    enabled: !!comicId,
  });

  return {
    totalChapters: data.total,
    chapters: data.chapters,
    isLoading,
    error,
    setPage,
    setSize,
    size,
    page,
  };
};
