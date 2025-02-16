import { useFollowComic } from "./useFollowComic";
import { useLikeComic } from "./useLikeComic";
import { useRatingComic } from "./useRatingComic";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { originalURL } from "@/shared/libs/config";
import { cn } from "@/shared/libs/utils";
import { useTranslation } from "react-i18next";
import { usePageContext } from "../../Context";
import { Rate } from "antd";
import { roundUpToNearestHalf } from "@/shared/helpers/helpers";

export const ComicInteraction = () => {
  const { comic, statusInteraction } = usePageContext();
  const { setScoreStar, scoreStar, handleRatingComic } = useRatingComic();
  const { handleFollow } = useFollowComic();
  const { handleLike } = useLikeComic();
  const { t } = useTranslation();

  const onChangeRatingStar = (value: number) => {
    setScoreStar(value);
    handleRatingComic(comic?.id);
  };

  return (
    <div className="col-span-2 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4 mobile:text-xs">
      <div className="font-bold text-xl mobile:text-sm">
        {t("comicInteraction.label", { ns: "common" })}
      </div>
      <div className="flex justify-between">
        <Rate
          allowHalf
          disabled={statusInteraction.isEvaluated}
          value={roundUpToNearestHalf(scoreStar)}
          onChange={onChangeRatingStar}
        />
        <span>{comic.star}</span>
      </div>
      <div className="flex justify-between">
        <h2>{t("comicInteraction.viewTimes", { ns: "common" })}</h2>
        <span>{comic.view}</span>
      </div>
      <div className="flex justify-between">
        <h2>{t("comicInteraction.likeTimes", { ns: "common" })}</h2>
        <span>{comic.like}</span>
      </div>
      <div className="flex justify-between">
        <h2>{t("comicInteraction.followTimes", { ns: "common" })}</h2>
        <span>{comic.follow}</span>
      </div>
      <div className="flex justify-around">
        <i
          className={cn("pi text-red-600 cursor-pointer", {
            "pi-heart-fill": statusInteraction.isFollowed,
            "pi-heart": !statusInteraction.isFollowed,
          })}
          style={{ fontSize: "2.5rem" }}
          onClick={() => handleFollow(comic.id)}
        ></i>
        <i
          className={cn("pi text-blue-600 cursor-pointer", {
            "pi-thumbs-up-fill": statusInteraction.isLiked,
            "pi-thumbs-up": !statusInteraction.isLiked,
          })}
          style={{ fontSize: "2.5rem" }}
          onClick={() => handleLike(comic.id)}
        ></i>
        <FacebookShareButton
          children={<FacebookIcon size={40} />}
          url={`${originalURL}/truyen/${comic.slug}`}
        />
      </div>
    </div>
  );
};
