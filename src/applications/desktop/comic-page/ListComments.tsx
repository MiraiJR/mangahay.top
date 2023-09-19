import CardComment from "@/shared/components/card/CardComment";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useState } from "react";

interface itemProps {
  comments: UserComment[];
}

const THE_NUMBER_OF_COMMENTS_PER_PAGE: number = 10;

const ListComments = ({ comments }: itemProps) => {
  const [first, setFirst] = useState<number>(0);
  const [pageComments, setPageComments] = useState<UserComment[]>([]);

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

  return (
    <div className="flex flex-col mt-10 w-[100%] mobile:px-2">
      <div className="mt-10">
        {pageComments.map((comment) => (
          <CardComment comment={comment} key={comment.id} />
        ))}
      </div>
      {comments.length !== 0 && (
        <div className="card">
          <Paginator
            first={first}
            rows={THE_NUMBER_OF_COMMENTS_PER_PAGE}
            totalRecords={comments.length}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ListComments;
