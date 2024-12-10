type Chapter = {
  id: number;
  name: string;
  images: ChapterImage[];
  slug: string;
  updatedAt: Date;
  comicId: number;
  creator: CreatorChapter | null;
  order: number;
  type: number;
};

type CreatorChapter = {
  id: number;
  fullname: string;
  avatar: string;
};

type ChapterImage = {
  id: number;
  relativePath: string;
  position: number;
};

type ReorderChapter = {
  chapterId: number;
  newOrder: number;
};
