import { formatDate, reduceQualityImage } from "@/shared/helpers/helpers";
import MeService from "@/shared/services/meService";
import themeStore from "@/shared/stores/themeStore";
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { DataScroller } from "primereact/datascroller";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";

const ListFollowingComics = () => {
  const [comics, setComics] = useState<Comic[] | null>(null);

  useEffect(() => {
    const getNotifies = async () => {
      try {
        const { data } = await MeService.getFollowingComics();
        setComics(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getNotifies();
  }, []);

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
                className={`p-1 bg-${themeStore.getOppositeTheme()} text-${themeStore.getTheme()} rounded-md capitalize`}
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
                className={`p-1 bg-${themeStore.getOppositeTheme()} text-${themeStore.getTheme()} rounded-md capitalize`}
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
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {comics ? (
        <DataScroller
          pt={{
            item: {
              className: `bg-${themeStore.getTheme()} text-${themeStore.getOppositeTheme()}`,
            },
          }}
          value={comics}
          itemTemplate={itemTemplate}
          rows={5}
          buffer={0.4}
          header="Danh sách truyện đang theo dõi"
        />
      ) : (
        <div className="flex items-center justify-center w-[100%] col-span-12">
          <ProgressSpinner
            style={{ width: "100px", height: "100px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
    </div>
  );
};

export default ListFollowingComics;
