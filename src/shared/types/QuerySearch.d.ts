type QuerySearch = {
  name?: string;
  page?: number;
  size?: number;
  status?: string;
  orderBy?: OrderByOption;
  author?: string;
  genres?: string[];
};

type OrderByOption = "asc" | "desc" | "updatedAt" | "view";

type SeachComicByName = {
  name: string;
};
