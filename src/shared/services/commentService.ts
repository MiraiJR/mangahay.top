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
};
export default CommentService;
