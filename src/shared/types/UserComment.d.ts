type UserComment = {
  id: number;
  comicId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserBriefInformation;
  answers: Answer[];
};
