import axiosClient from "../libs/axiosClient";

const CommentService = {
  commentOnComic: (comicId: number, content: string) =>
    axiosClient.post<any>(`/comments`, {
      comicId,
      content,
    }),
  answerComment: (
    comicId: number,
    targetCommentId: number,
    content: string,
    mentionedUserId: number | null
  ) =>
    axiosClient.post<any>(`/comments`, {
      comicId,
      targetCommentId,
      content,
      mentionedUserId,
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
