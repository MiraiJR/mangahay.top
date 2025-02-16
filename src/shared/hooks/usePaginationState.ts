import { useState } from "react";

interface InitialPaginationState {
  initialPage?: number;
  initialSize?: number;
}

export const usePaginationState = ({
  initialPage,
  initialSize,
}: InitialPaginationState) => {
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [size, setSize] = useState<number>(initialSize ?? 20);

  return {
    page,
    setPage,
    size,
    setSize,
  };
};
