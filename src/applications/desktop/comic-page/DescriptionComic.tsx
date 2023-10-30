import { cn } from "@/shared/libs/utils";
import comicService from "@/shared/services/comicService";
import meService, { TypeComicInteraction } from "@/shared/services/meService";
import { globalStore } from "@/shared/stores/globalStore";
import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { convertWebpResource } from "@/shared/helpers/helpers";

interface itemProps {
  comic: Comic;
  setComic: Function;
  firstChapter: Chapter | null;
  lastChapter: Chapter | null;
}

const DescriptionComic = ({
  comic,
  setComic,
  firstChapter,
  lastChapter,
}: itemProps) => {
  const {} = useContext(ThemeContext);
  const { slugChapter } = useParams();
  const [scoreStar, setScoreStar] = useState<number>(comic.star);
  const { isLogined } = globalStore();
  const router = useRouter();
  const [statusInteractComic, setStatusInteraction] =
    useState<StatusInteractWithComic>({
      isEvaluated: false,
      isLiked: false,
      isFollowed: false,
    });

  const handleRatingComic = async (event: RatingChangeEvent) => {
    if (!isLogined) {
      toast.warn("Bạn phải đăng nhập để thực hiện thao tác này!");
      return;
    }

    if (statusInteractComic.isEvaluated) {
      toast.warn("Bạn đã đánh giá truyện này rồi!");
      return;
    }

    if (event.value) {
      setScoreStar(event.value);

      try {
        const { data } = await comicService.evaluateComic(
          comic.id,
          event.value
        );

        toast.success(data);
        setStatusInteraction({
          ...statusInteractComic,
          isEvaluated: true,
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleFollowComic = async () => {
    if (!isLogined) {
      toast.warn("Bạn phải đăng nhập để thực hiện thao tác này!");
      return;
    }

    try {
      const { data } = await meService.interactWithComic(
        comic.id,
        statusInteractComic.isFollowed
          ? TypeComicInteraction.unfollow
          : TypeComicInteraction.follow
      );

      toast.success(
        statusInteractComic.isFollowed
          ? "Huỷ theo dõi thành công!"
          : "Theo dõi thành công!"
      );

      if (statusInteractComic.isFollowed) {
        setComic({
          ...comic,
          follow: comic.follow - 1,
        });
      } else {
        setComic({
          ...comic,
          follow: comic.follow + 1,
        });
      }

      setStatusInteraction(data);
    } catch (error: any) {
      toast.warn(error.message);
    }
  };

  const handleLikeComic = async () => {
    if (!isLogined) {
      toast.warn("Bạn phải đăng nhập để thực hiện thao tác này!");
      return;
    }

    try {
      const { data } = await meService.interactWithComic(
        comic.id,
        statusInteractComic.isLiked
          ? TypeComicInteraction.unlike
          : TypeComicInteraction.like
      );

      toast.success(
        statusInteractComic.isLiked
          ? "Huỷ thích thành công!"
          : "Thích thành công!"
      );

      if (statusInteractComic.isLiked) {
        setComic({
          ...comic,
          like: comic.like - 1,
        });
      } else {
        setComic({
          ...comic,
          like: comic.like + 1,
        });
      }

      setStatusInteraction(data);
    } catch (error: any) {
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    const getInteractionWithComic = async () => {
      try {
        const { data } = await meService.getInteractionWithComic(comic.id);

        setStatusInteraction(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (isLogined) {
      getInteractionWithComic();
    }
  }, []);

  return (
    <div
      className={`grid grid-cols-12 gap-2 text-${themeStore.getOppositeTheme()}`}
    >
      <Image
        priority
        width={0}
        height={0}
        className="col-span-3 shadow-lg p-5 mobile:col-span-12 w-[100%] max-h-[800px] object-cover object-top"
        src={convertWebpResource(comic.thumb)}
        alt={comic.name}
      />
      <div className="col-span-7 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4">
        <div className="mobile:flex mobile:flex-col gap-2">
          <h1 className="font-bold text-2xl" title={comic.name}>
            <span>{comic.name}</span>
          </h1>
          <span
            className="text-sm font-thin text-yellow-500 ml-1"
            title={comic.state}
          >
            {comic.state}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Tên khác:</h2>
          <span>{comic.anotherName}</span>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Tác giả:</h2>
          <ul className="flex ">
            {comic.authors.map((author, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterAuthor=${author}`}
                className={`bg-${themeStore.getTheme()} rounded-md border border-${
                  themeStore.getOppositeTheme
                } px-1 capitalize`}
                rel="preload"
              >
                <h2 title={author}>{author}</h2>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Nhóm dịch:</h2>
          <ul className="flex flex-wrap gap-2">
            {comic.translators.length === 0 ? (
              <div>Đang cập nhật</div>
            ) : (
              comic.translators.map((translator, _index) => (
                <Link
                  key={_index}
                  href={`/nhom-dich/${translator}`}
                  className={`font-bold bg-${themeStore.getTheme()} text-red-600 rounded-md border border-${
                    themeStore.getOppositeTheme
                  } px-1 capitalize`}
                  rel="preload"
                >
                  <h2 title={translator}>{translator}</h2>
                </Link>
              ))
            )}
          </ul>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Thể loại:</h2>
          <ul className="flex gap-1 flex-wrap">
            {comic.genres.map((genre, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterGenres=${genre.toLocaleLowerCase()}`}
                rel="preload"
              >
                <h2
                  title={genre}
                  className={`bg-${themeStore.getTheme()} rounded-md border border-${
                    themeStore.getOppositeTheme
                  } px-1 capitalize`}
                >
                  {genre}
                </h2>
              </Link>
            ))}
          </ul>
        </div>
        <h2
          // className={`line-clamp-4 line`}
          title={comic.briefDescription}
          dangerouslySetInnerHTML={{ __html: comic.briefDescription }}
        ></h2>
        {!slugChapter && (
          <div className="flex gap-2">
            <button
              className="btn-primary"
              onClick={() =>
                router.push(`/truyen/${comic.slug}/${firstChapter?.slug}`)
              }
            >
              Đọc ngay
            </button>
            <button
              className="btn-primary bg-green-600"
              onClick={() =>
                router.push(`/truyen/${comic.slug}/${lastChapter?.slug}`)
              }
            >
              Đọc chương mới nhất
            </button>
          </div>
        )}
      </div>

      {!slugChapter && (
        <div className="col-span-2 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4">
          <div className="font-bold text-xl">Đánh giá:</div>
          <div className="flex justify-between">
            <Rating
              value={scoreStar}
              cancel={false}
              onChange={(e: RatingChangeEvent) => handleRatingComic(e)}
            />
            <span>{comic.star}</span>
          </div>
          <div className="flex justify-between">
            <h2>Lượt xem:</h2>
            <span>{comic.view}</span>
          </div>
          <div className="flex justify-between">
            <h2>Lượt thích:</h2>
            <span>{comic.like}</span>
          </div>
          <div className="flex justify-between">
            <h2>Lượt theo dõi:</h2>
            <span>{comic.follow}</span>
          </div>
          <div className="flex justify-around">
            <i
              className={cn("pi text-red-600 cursor-pointer", {
                "pi-heart-fill": statusInteractComic.isFollowed,
                "pi-heart": !statusInteractComic.isFollowed,
              })}
              style={{ fontSize: "2.5rem" }}
              onClick={handleFollowComic}
            ></i>
            <i
              className={cn("pi text-blue-600 cursor-pointer", {
                "pi-thumbs-up-fill": statusInteractComic.isLiked,
                "pi-thumbs-up": !statusInteractComic.isLiked,
              })}
              style={{ fontSize: "2.5rem" }}
              onClick={handleLikeComic}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionComic;
