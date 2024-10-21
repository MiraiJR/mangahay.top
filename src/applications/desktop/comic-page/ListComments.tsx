import CardComment from "@/shared/components/card/CardComment";
import { THE_NUMBER_OF_COMMENTS_PER_PAGE } from "@/shared/settings/CommonConfig";
import { Paginator } from "primereact/paginator";
import { useListComment } from "./useListComments";

interface itemProps {
  comments: UserCommentResponse[];
}

const ListComments = ({ comments }: itemProps) => {
  const { onPageChange, pageComments, first } = useListComment(comments);

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
