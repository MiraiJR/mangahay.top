import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";
import { usePaginationState } from "./usePaginationState";
import { THE_NUMBER_OF_COMMENTS_PER_PAGE } from "../settings/CommonConfig";

export const useListComment = (comicId: number) => {
  const { page, setPage, size } = usePaginationState({
    initialPage: 1,
    initialSize: THE_NUMBER_OF_COMMENTS_PER_PAGE,
  });

  const { data, refetch, status, isFetching } = useQuery({
    queryKey: ["comic.comments", { comicId, page, size }],
    queryFn: async () => {
      const { data } = await ComicService.getListComment(comicId, page, size);
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
    page,
    size,
  };
};
