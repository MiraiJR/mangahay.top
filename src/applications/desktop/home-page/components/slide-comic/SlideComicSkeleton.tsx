import { Skeleton } from "primereact/skeleton";

export const SlideComicSkeleton = () => {
  return (
    <>
      <div className="flex flex-col px-10 w-[100%] gap-5 mobile:w-fit mobile:mt-4">
        <Skeleton height="3rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <div className="flex gap-2 flex-wrap">
          <Skeleton width="4rem" height="2rem" className="mb-2"></Skeleton>
          <Skeleton width="4rem" height="2rem" className="mb-2"></Skeleton>
          <Skeleton width="4rem" height="2rem" className="mb-2"></Skeleton>
        </div>
        <Skeleton width="6rem" height="2rem" className="mb-2"></Skeleton>
      </div>
      <div className="">
        <Skeleton width="15rem" height="20rem"></Skeleton>
      </div>
    </>
  );
};
