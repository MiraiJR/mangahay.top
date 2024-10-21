import { THE_NUMBER_OF_COMMENTS_PER_PAGE } from "@/shared/settings/CommonConfig";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useState } from "react";

export const useListComment = (comments: UserCommentResponse[]) => {
  const [first, setFirst] = useState<number>(0);
  const [pageComments, setPageComments] = useState<UserCommentResponse[]>([]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setPageComments(
      comments.slice(event.first, event.first + THE_NUMBER_OF_COMMENTS_PER_PAGE)
    );
  };

  useEffect(() => {
    setPageComments(
      comments.slice(first, first + THE_NUMBER_OF_COMMENTS_PER_PAGE)
    );
  }, [comments]);

  return {
    onPageChange,
    pageComments,
    first,
  };
};
