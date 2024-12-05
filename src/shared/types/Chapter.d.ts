type Chapter = {
  id: number;
  name: string;
  images: string[];
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
