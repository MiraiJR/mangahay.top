import { formatDate, reduceQualityImage } from "@/shared/helpers/helpers";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { Rating } from "primereact/rating";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { DataScroller } from "primereact/datascroller";
import Link from "next/link";
import MyLoading from "@/shared/components/MyLoading";
import EmptyComic from "@/shared/components/EmptyComic";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

const ListFollowingComics = () => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const [isUpdateData, setIsUpdateData] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const getFollowingComics = async () => {
      try {
        const { data } = await MeService.getFollowingComics();
        setComics(data);
        setIsLoading(false);
      } catch (error: any) {}
    };

    getFollowingComics();
  }, [isUpdateData]);

  const unfollowedComic = async (comicId: number) => {
    try {
      await MeService.interactWithComic(comicId, TypeComicInteraction.unfollow);

      setIsUpdateData(!isUpdateData);
      toast.success("Huỷ theo dõi truyện thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const itemTemplate = (comic: Comic) => {
    return (
      <div className="grid grid-cols-12 gap-4 p-2">
        <div className="col-span-1">
          <Link href={`/truyen/${comic.slug}`}>
            <Image
              width={0}
              height={0}
              className="w-[100%]"
              src={reduceQualityImage(comic.thumb)}
              alt={comic.name}
            />
          </Link>
        </div>
        <div className="col-span-8 flex flex-col gap-4">
          <div className="font-bold">{comic.name}</div>
          <div className="flex flex-wrap items-center gap-2">
            {comic.genres.map((genre, _index) => (
              <Link
                key={_index}
                className={`p-1 bg-${oppositeTheme} text-${theme} rounded-md capitalize`}
                title={genre}
                href={`/the-loai/${genre}`}
              >
                {genre}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {comic.authors.map((author, _index) => (
              <Link
                key={_index}
                className={`p-1 bg-${oppositeTheme} text-${theme} rounded-md capitalize`}
                title={author}
                href={`/tim-kiem?filterAuthor=${author}`}
              >
                {author}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <Rating value={comic.star} cancel={false} readOnly />
            <span>{comic.star}</span>
          </div>
        </div>
        <div className="col-span-3 flex flex-col items-end justify-center gap-4">
          <span>{formatDate(comic.updatedAt)}</span>
          <span className="text-orange-400">{comic.state}</span>
          <Button
            className="!py-1 !px-2"
            label="Huỷ theo dõi"
            severity="danger"
            onClick={() => unfollowedComic(comic.id)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {isLoading ? (
        <MyLoading />
      ) : comics.length === 0 ? (
        <EmptyComic content="Bạn chưa theo dõi truyện nào cả!!" />
      ) : (
        <DataScroller
          pt={{
            item: {
              className: `bg-${theme} text-${oppositeTheme}`,
            },
            header: {
              className: `bg-${theme} text-${oppositeTheme}`,
            },
            list: {
              className: `bg-${theme}`,
            },
            content: {
              className: `bg-${theme}`,
            },
          }}
          value={comics}
          itemTemplate={itemTemplate}
          rows={5}
          buffer={0.4}
          header="Danh sách truyện đang theo dõi"
        />
      )}
    </div>
  );
};

export default ListFollowingComics;
