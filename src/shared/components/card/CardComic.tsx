import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import { Rating } from "primereact/rating";
import { useState, useContext } from "react";

interface itemProps {
  comic: Comic;
}

interface itemPropsPreviewComic {
  comic: Comic;
}

const PreviewComic = ({ comic }: itemPropsPreviewComic) => {
  const { theme } = useContext(ThemeContext);

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

const CardComic = ({ comic }: itemProps) => {
  const {} = useContext(ThemeContext);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const openPreviewComic = (event: any) => {
    setIsOpenPreview(true);

    const previewComicElement = document.getElementById(
      `preview-comic-${comic.id}`
    );
    if (previewComicElement) {
      previewComicElement.style.top = `${event.clientY + 20}px`;
      previewComicElement.style.left = `${event.clientX + 20}px`;
      previewComicElement.style.zIndex = "1000";
    }
  };
  return (
    <div
      className={`flex flex-col capitalize text-${themeStore.getOppositeTheme()}`}
    >
      <a
        hrefLang="vi"
        href={`/truyen/${comic.slug}`}
        onMouseMove={(e: any) => openPreviewComic(e)}
        onMouseLeave={() => setIsOpenPreview(false)}
        lang="vi"
      >
        <img
          className="w-[100%] object-cover max-h-[250px] mobile:max-h-[140px]"
          src={comic.thumb}
          alt={comic.name}
        />
      </a>
      <a hrefLang="vi" href={`/truyen/${comic.slug}`} lang="vi">
        <h1
          className={`text-center font-bold line-clamp-2 mobile:text-sm text-${themeStore.getOppositeTheme()}`}
          title={comic.name}
        >
          {comic.name}
        </h1>
      </a>
      {comic.newestChapter && (
        <a
          hrefLang="vi"
          href={`/truyen/${comic.slug}/${comic.newestChapter.slug}`}
          lang="vi"
        >
          <h1
            className={`text-${themeStore.getOppositeTheme()} line-clamp-1 mobile:text-sm`}
            title={comic.newestChapter.name}
          >
            {comic.newestChapter.name}
          </h1>
        </a>
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
      {isOpenPreview && <PreviewComic comic={comic} />}
    </div>
  );
};

export default CardComic;
