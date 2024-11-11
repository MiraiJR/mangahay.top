type QuerySearch = {
  name?: string;
  page?: number;
  size?: number;
  status?: string;
  orderBy?: 'asc' | 'desc' | 'updatedAt' | 'view' = 'updatedAt';
  author?: string;
  genres?: string[];
};
