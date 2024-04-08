import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "primereact/rating";
import { useState, useContext, useEffect } from "react";
import { reduceQualityImage } from "@/shared/helpers/helpers";

interface itemProps {
  comic: Comic;
}

interface itemPropsPreviewComic {
  comic: Comic;
  position: ElementPostion;
}

const PreviewComic = ({ comic, position }: itemPropsPreviewComic) => {
  const { theme } = useContext(ThemeContext);

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
      className={`fixed bg-${themeStore.getOppositeTheme()} text-${theme} w-[500px] p-5 z-1`}
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
        <Rating value={comic.star} cancel={false} readOnly />
      </div>
      <div className="flex flex-wrap gap-2">
        <h2>Nội dung:</h2>
        <h2 dangerouslySetInnerHTML={{ __html: comic.briefDescription }}></h2>
      </div>
    </div>
  );
};

const CardComicHistory = ({ comic }: itemProps) => {
  const {} = useContext(ThemeContext);
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
    <div
      className={`flex flex-col capitalize text-${themeStore.getOppositeTheme()}`}
    >
      <Link
        rel="preload"
        hrefLang="vi"
        href={`/truyen/${comic.slug}`}
        onMouseMove={(e: any) => openPreviewComic(e)}
        onMouseLeave={() => setIsOpenPreview(false)}
        lang="vi"
      >
        <Image
          loading="lazy"
          height={100}
          width={100}
          className="w-[100%] object-cover h-[280px] mobile:max-h-[200px]"
          src={reduceQualityImage(comic.thumb)}
          alt={comic.name}
        />
      </Link>
      <Link
        rel="preload"
        hrefLang="vi"
        href={`/truyen/${comic.slug}`}
        lang="vi"
      >
        <h2
          className={`text-center font-bold line-clamp-2 mobile:text-sm text-${themeStore.getOppositeTheme()}`}
          title={comic.name}
        >
          {comic.name}
        </h2>
      </Link>
      {comic.chapters.length > 0 ? (
        <Link
          rel="preload"
          hrefLang="vi"
          href={`/truyen/${comic.slug}/${comic.chapters[0].slug}`}
          lang="vi"
        >
          <h3
            className={`text-${themeStore.getOppositeTheme()} line-clamp-2 mobile:text-sm`}
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
          <Rating value={comic.star} cancel={false} readOnly />
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
