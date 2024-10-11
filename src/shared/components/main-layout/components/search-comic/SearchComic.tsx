import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import ListSearchingComics from "./ListResultSearchComics";
import { useSearchComic } from "./useSearchComic";
import { useTranslation } from "react-i18next";

export const SearchComic = () => {
  const { t } = useTranslation();
  const {
    inputSearch,
    setInputSearch,
    searchResult,
    isShowSearchResult,
    setIsShowSearchResult,
    handleSearchComic,
    reset,
  } = useSearchComic();
  const router = useRouter();

  return (
    <>
      <div className="mobile:hidden">
        <div className="p-input-icon-left relative">
          <i
            className="pi pi-search cursor-pointer right-0 px-3"
            onClick={() => router.push("/tim-kiem")}
          />
          <InputText
            className="w-[300px] border-black border-[1px] p-2"
            placeholder={t("search.placeholder", { ns: "common" })}
            value={inputSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputSearch(e.target.value);
              handleSearchComic(e.target.value);
              setIsShowSearchResult(true);
            }}
            onFocus={() => setIsShowSearchResult(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsShowSearchResult(false);
              }, 100);
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                router.push(`/tim-kiem?comicName=${inputSearch}`);
                setIsShowSearchResult(false);
                reset();
              }
            }}
          />
          {isShowSearchResult && <ListSearchingComics comics={searchResult} />}
        </div>
      </div>
      <Link
        href="/tim-kiem"
        hrefLang="vi"
        className="desktop:hidden p-2 bg-black rounded"
      >
        <Search className="" color="white" size={20} />
      </Link>
    </>
  );
};
