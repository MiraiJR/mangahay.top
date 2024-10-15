import CardComic from "@/shared/components/card/CardComic";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { originalURL } from "@/shared/libs/config";
import { cn } from "@/shared/libs/utils";
import ComicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/theme-storage";
import { useParams } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { useContext, useEffect, useState } from "react";
import EmptyComic from "@/shared/components/EmptyComic";
import MyLoading from "@/shared/components/MyLoading";
import { useRouter } from "next/router";

interface itemProps {
  genres: Genre[];
  dataComics?: Comic[];
}

const THE_NUMBER_OF_COMICS_PER_PAGE: number = 30;

const ListComicsPage = ({ genres, dataComics }: itemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { genre } = useParams();
  const currentGenre = genre ?? null;
  const items: MenuItem[] = [
    { label: "Danh sách truyện", url: `${originalURL}/danh-sach-truyen` },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };
  const {} = useContext(ThemeContext);
  const [comics, setComics] = useState<Comic[]>(dataComics ?? []);
  const [first, setFirst] = useState<number>(0);
  const [pageComics, setPageComics] = useState<Comic[]>([]);
  const router = useRouter();

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);

    if (!comics) {
      return;
    }

    setPageComics(
      comics.slice(event.first, event.first + THE_NUMBER_OF_COMICS_PER_PAGE)
    );
  };

  useEffect(() => {
    const field = (router.query.field as string) ?? "";

    const getComics = async (field: string) => {
      try {
        if (field === "") {
          const { data } = await ComicService.getRankingComics(field, 1000);

          setComics(data.comics);
        } else {
          const { data } = await ComicService.getComicsWithChapters();

          setComics(data);
        }

        setIsLoading(true);
      } catch (error: any) {}
    };

    if (!dataComics) {
      setIsLoading(false);
      getComics(field);
    }
  }, []);

  return (
    <div>
      <div className="mb-5">
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8 mobile:col-span-12">
          <div
            className={`border border-${themeStore.getOppositeTheme()} text-${themeStore.getOppositeTheme()}`}
          >
            <h2
              className={`font-bold p-2 border border-b-${themeStore.getOppositeTheme()}`}
            >
              Danh sách truyện
            </h2>
            <div className="grid grid-cols-5 mobile:grid-cols-2 relative gap-4 p-4">
              {isLoading ? (
                <MyLoading />
              ) : comics.length !== 0 ? (
                comics.map((comic) => (
                  <CardComic comic={comic} key={comic.id} />
                ))
              ) : (
                <EmptyComic />
              )}
            </div>
            {comics && comics.length !== 0 && (
              <div className="card mt-4 flex items-center justify-center w-[100%]">
                <Paginator
                  first={first}
                  rows={THE_NUMBER_OF_COMICS_PER_PAGE}
                  totalRecords={comics?.length}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className={`col-span-4 mobile:col-span-12`}>
          <div
            className={`border border-${themeStore.getOppositeTheme()} text-${themeStore.getOppositeTheme()}`}
          >
            <h2
              className={`font-bold p-2 border border-b-${themeStore.getOppositeTheme()}`}
            >
              Thể loại
            </h2>
            <ul className="grid grid-cols-3 gap-1 p-2">
              {genres ? (
                genres.map((genre) => (
                  <a
                    href={`/the-loai/${genre.slug}`}
                    title={genre.name}
                    key={genre.slug}
                    className={cn(
                      "p-1 cursor-pointer hover:bg-slate-500 hover:text-red-400 mobile:text-sm",
                      {
                        "bg-slate-500 text-red-400":
                          currentGenre && currentGenre === genre.slug,
                      }
                    )}
                    hrefLang="vi"
                  >
                    {genre.name}
                  </a>
                ))
              ) : (
                <div className="flex items-center justify-center w-[100%] col-span-12">
                  <ProgressSpinner
                    style={{ width: "50px", height: "50px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComicsPage;
