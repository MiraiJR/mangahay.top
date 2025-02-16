import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { roundUpToNearestHalf } from "@/shared/helpers/helpers";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface itemProps {
  comic: Comic;
}

interface itemPropsPreviewComic {
  comic: Comic;
  position: ElementPostion;
}

const PreviewComic = ({ comic, position }: itemPropsPreviewComic) => {
  const { theme, oppositeTheme } = useThemeContext();

  useEffect(() => {
    const previewComicElement = document.getElementById(
      `preview-comic-${comic.id}`
    );

    if (previewComicElement) {
      previewComicElement.style.top = `${position.top}px`;
      previewComicElement.style.left = `${position.left}px`;
      previewComicElement.style.zIndex = "1000";
    }
  });

  return (
    <div
      id={`preview-comic-${comic.id}`}
      className={`fixed bg-${oppositeTheme} text-${theme} w-[500px] p-5 z-1`}
    >
      <div className="flex flex-wrap gap-2">
        <h2>Tên:</h2>
        <h2>{comic.name}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Tên khác:</h2>
        <h2>{comic.anotherName}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Lượt xem:</h2>
        <h2>{comic.view}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Lượt thích:</h2>
        <h2>{comic.like}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Lượt theo dõi:</h2>
        <h2>{comic.follow}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Đánh giá:</h2>
        <Rate allowHalf disabled value={roundUpToNearestHalf(comic.star)} />
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Nội dung:</h2>
        <h2 dangerouslySetInnerHTML={{ __html: comic.briefDescription }}></h2>
      </div>
    </div>
  );
};

const CardComicHistory = ({ comic }: itemProps) => {
  const { oppositeTheme } = useThemeContext();
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [previewPosition, setPreviewPostion] = useState<ElementPostion>({
    top: 0,
    left: 0,
  });

  const openPreviewComic = async (event: any) => {
    setIsOpenPreview(true);
    setPreviewPostion({
      top: event.clientY + 20,
      left: event.clientX + 20,
    });
  };

  useEffect(() => {}, [comic]);

  return (
    <div className={`flex flex-col capitalize text-${oppositeTheme}`}>
      <Link
        href={`/truyen/${comic.slug}`}
        prefetch={false}
        onMouseMove={(e: any) => openPreviewComic(e)}
        onMouseLeave={() => setIsOpenPreview(false)}
      >
        <Image
          loading="lazy"
          height={100}
          width={100}
          className="w-[100%] object-cover h-[280px] mobile:max-h-[200px]"
          src={comic.thumb}
          alt={comic.name}
        />
      </Link>
      <Link href={`/truyen/${comic.slug}`} prefetch={false}>
        <h2
          className={`text-center font-bold line-clamp-2 mobile:text-xs text-${oppositeTheme}`}
          title={comic.name}
        >
          {comic.name}
        </h2>
      </Link>
      {comic.chapters.length > 0 ? (
        <Link
          href={`/truyen/${comic.slug}/${comic.chapters[0].slug}`}
          prefetch={false}
        >
          <h3
            className={`text-${oppositeTheme} line-clamp-2 mobile:text-sm`}
            title={comic.chapters[0].name}
          >
            Đang đọc {comic.chapters[0].name}
          </h3>
        </Link>
      ) : (
        <span>Chưa đọc chương </span>
      )}
      <div className="flex justify-between items-center">
        <div className="mobile:hidden">
          <Rate allowHalf disabled value={roundUpToNearestHalf(comic.star)} />
        </div>
        <div className="desktop:hidden">
          <i className="pi pi-star-fill text-yellow-500"></i>
        </div>
        <span>{comic.star}</span>
      </div>
      {isOpenPreview && (
        <PreviewComic comic={comic} position={previewPosition} />
      )}
    </div>
  );
};

export default CardComicHistory;
