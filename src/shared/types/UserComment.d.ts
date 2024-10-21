interface UserCommentResponse {
  id: number;
  parentCommentId: number | null;
  comicId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: CreatorCommentResponse;
  mentionedUser: MentionedUserCommentResponseResponse;
  answers: UserCommentResponseResponse[];
}

interface CreatorCommentResponse {
  id: number;
  fullname: string;
  avatar: string;
}

interface MentionedUserCommentResponseResponse extends CreatorCommentResponse {}
