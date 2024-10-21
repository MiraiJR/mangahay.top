import { Rating, RatingChangeEvent } from "primereact/rating";
import { useFollowComic } from "./useFollowComic";
import { useInteractionComic } from "./useInteractionComic";
import { useLikeComic } from "./useLikeComic";
import { useRatingComic } from "./useRatingComic";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { originalURL } from "@/shared/libs/config";
import { cn } from "@/shared/libs/utils";
import { useTranslation } from "react-i18next";

interface ComicInteractionProps {
  comic: Comic;
}

export const ComicInteraction = ({ comic }: ComicInteractionProps) => {
  const { statusInteractComic } = useInteractionComic(comic.id);
  const { setScoreStar, scoreStar, handleRatingComic } = useRatingComic(comic);
  const { handleFollow } = useFollowComic(comic.id);
  const { handleLike } = useLikeComic(comic.id);
  const { t } = useTranslation();

  return (
    <div className="col-span-2 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4">
      <div className="font-bold text-xl">
        {t("comicInteraction.label", { ns: "common" })}
      </div>
      <div className="flex justify-between">
        <Rating
          disabled={statusInteractComic.isEvaluated}
          value={scoreStar}
          cancel={false}
          onChange={(e: RatingChangeEvent) => {
            if (e.value) {
              setScoreStar(e.value);
              handleRatingComic();
            }
          }}
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
            "pi-heart-fill": statusInteractComic.isFollowed,
            "pi-heart": !statusInteractComic.isFollowed,
          })}
          style={{ fontSize: "2.5rem" }}
          onClick={() => handleFollow()}
        ></i>
        <i
          className={cn("pi text-blue-600 cursor-pointer", {
            "pi-thumbs-up-fill": statusInteractComic.isLiked,
            "pi-thumbs-up": !statusInteractComic.isLiked,
          })}
          style={{ fontSize: "2.5rem" }}
          onClick={() => handleLike()}
        ></i>
        <FacebookShareButton
          children={<FacebookIcon size={40} />}
          url={`${originalURL}/truyen/${comic.slug}`}
        />
      </div>
    </div>
  );
};
