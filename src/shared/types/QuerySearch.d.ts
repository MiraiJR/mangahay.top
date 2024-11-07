type QuerySearch = {
  name?: string;
  page?: number;
  size?: number;
  status?: string;
  orderBy?: 'asc' | 'desc' | 'updatedAt' | 'view' | 'follow' | 'like' = 'updatedAt';
  author?: string;
  genres?: string[];
};
