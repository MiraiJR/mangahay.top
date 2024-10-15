import { CardRankingSkeleton } from "@/shared/components/card/CardRankingSkeleton";

export const ListComicsRankingSkeleton = () => {
  const length = 5;
  const elements = Array.from({ length }, (_, index) => index + 1);

  return (
    <div className="">
      {elements.map((index) => (
        <CardRankingSkeleton key={index} />
      ))}
    </div>
  );
};
