import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";
import { THE_NUMBER_OF_COMMENTS_PER_PAGE } from "../settings/CommonConfig";

export const useListComment = (comicId: number) => {
  const [page, setPage] = useState<number>(1);

  const { data, refetch, status, isFetching } = useQuery({
    queryKey: [
      "comic.comments",
      { comicId, page, size: THE_NUMBER_OF_COMMENTS_PER_PAGE },
    ],
    queryFn: async () => {
      const { data } = await ComicService.getListComment(
        comicId,
        page,
        THE_NUMBER_OF_COMMENTS_PER_PAGE
      );
      return data;
    },
  });

  return {
    comments: data?.comments ?? [],
    totalComment: data?.total,
    hasPrevious: data?.hasPrevious ?? false,
    refetch,
    status,
    isFetching,
    setPage,
  };
};
