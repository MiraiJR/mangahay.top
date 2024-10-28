import { useState } from "react";

export const usePaginationComment = (comments: UserCommentResponse[]) => {
  const [pagination, setPagination] = useState<number>(0);

  return {
    pagination,
    setPagination,
  };
};
