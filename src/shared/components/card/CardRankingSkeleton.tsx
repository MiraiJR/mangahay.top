import { Skeleton } from "primereact/skeleton";

export const CardRankingSkeleton = () => {
  return (
    <div className="grid grid-cols-12 p-2 border-b-2">
      <Skeleton height="2rem" width="2rem" className="mb-2 w-[100%]"></Skeleton>
      <div className="col-span-11">
        <Skeleton height="2rem" className="mb-2 w-[100%]"></Skeleton>
        <Skeleton height="1rem" width="10rem" className="mb-2"></Skeleton>
      </div>
    </div>
  );
};
