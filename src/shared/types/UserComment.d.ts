type UserComment = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  answers: Answer[];
};
