interface UserCommentResponse {
  id: number;
  parentCommentId: number | null;
  comicId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: CreatorCommentResponse | null;
  mentionedUser: MentionedUserCommentResponseResponse;
  theNumberOfAnswer: number;
}

interface CreatorCommentResponse {
  id: number;
  fullname: string;
  avatar: string;
}

interface MentionedUserCommentResponseResponse extends CreatorCommentResponse {}
