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
  creator: number;
  createdAt: Date;
  updatedAt: Date;
  newestChapter?: Chapter;
};