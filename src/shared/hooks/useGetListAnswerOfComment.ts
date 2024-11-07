import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import CommentService from "../services/commentService";

interface ListAnswerResponse {
  answers: UserCommentResponse[];
  hasPrevious: boolean;
}

const Default: ListAnswerResponse = {
  answers: [],
  hasPrevious: true,
};

export const useGetListAnswerOfComment = (commentId: number) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ListAnswerResponse>({
      queryKey: ["comment.answers", { commentId }],
      queryFn: async ({ pageParam }: any) => {
        if (pageParam) {
          const { data } = await CommentService.listAnswerOfComment(
            commentId,
            pageParam.limit,
            pageParam.lastAnswerId
          );
          return data;
        }

        return Default;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (lastPage.hasPrevious) {
          return {
            lastAnswerId:
              lastPage.answers[lastPage.answers.length - 1]?.id ?? null,
            limit: 20,
          };
        }

        return null;
      },
    });

  const reset = () => {
    queryClient.setQueryData(["comment.answers", { commentId }], () => ({
      pages: [Default],
      pageParams: [null],
    }));
  };

  return {
    answers: data?.pages.flatMap((page) => page.answers) ?? [],
    hasPrevious: data?.pages[0]?.hasPrevious ?? false,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    reset,
  };
};
