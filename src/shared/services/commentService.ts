import axiosClient from "../libs/axiosClient";

const CommentService = {
  commentOnComic: (
    comicId: number,
    content: string,
    mentionedUserIds?: number[],
    targetCommentId?: number
  ) =>
    axiosClient.post<UserCommentResponse>(`/comments`, {
      comicId,
      targetCommentId,
      content,
      mentionedUserIds,
    }),
  listAnswerOfComment: (
    commentId: number,
    limit: number,
    lastAnswerId: number | null
  ) =>
    axiosClient.get<{
      answers: UserCommentResponse[];
      hasPrevious: boolean;
    }>(`/comments/${commentId}/answers`, {
      params: {
        limit,
        lastAnswerId,
      },
    }),
};
export default CommentService;
