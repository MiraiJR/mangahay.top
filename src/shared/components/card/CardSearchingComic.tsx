interface itemProps {
  comic: Comic;
}

const CardSearchingComic = ({ comic }: itemProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-2">
      <a
        className="col-span-3 max-h-[100px]"
        hrefLang="vi"
        href={`/truyen/${comic.slug}`}
      >
        <img src={comic.thumb} alt={comic.name} />
      </a>
      <div className="col-span-9 flex flex-col">
        <a hrefLang="vi" href={`/truyen/${comic.slug}`}>
          <h1
            className="line-clamp-2 text-left capitalize font-bold"
            title={comic.name}
          >
            {comic.name}
          </h1>
        </a>
        <a
          hrefLang="vi"
          href={`/truyen/${comic.slug}/${comic.newestChapter?.slug}`}
        >
          <h2 className="text-left font-thin capitalize">
            {comic.newestChapter?.name}
          </h2>
        </a>
      </div>
    </div>
  );
};

export default CardSearchingComic;
