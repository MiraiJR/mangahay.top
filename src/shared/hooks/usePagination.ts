import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);

  return {
    page,
    setPage,
    size,
    setSize,
  };
};
