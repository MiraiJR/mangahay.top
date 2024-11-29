type Comic = {
  id: number;
  slug: string;
  name: string;
  anotherName: string;
  genres: string[];
  authors: string[];
  state: string;
  thumb: string;
  briefDescription: string;
  view: number;
  like: number;
  follow: number;
  star: number;
  creator: User;
  creatorId: number | null;
  createdAt: Date;
  updatedAt: Date;
  translators: string[];
  chapters: Chapter[];
  comments: UserCommentResponse[];
  privileges: number[];
};

type PagingComic = {
  page: number;
  limit: number;
  total: number;
  comics: Comic[];
};

type SearchComicResult = {
  query: QuerySearch;
  total: number;
  comics: Comic[];
  hasNext: boolean;
};

type ComicPrivilege = {
  id: number;
  comicId: number;
  permissions: number[];
  user: {
    id: number;
    fullname: string;
    avatar: string;
  };
};
