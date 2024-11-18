import { Divider } from "primereact/divider";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { ChangeEvent, useEffect } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { optionSort, optionStatus } from "./constant";
import { useSearchState } from "./useSearchState";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import { useTranslation } from "react-i18next";
import { useSearchComic } from "@/shared/hooks/useSearchComic";

interface itemProps {
  setComics: any;
  resultRef: any;
}

const BoxSearch = ({ setComics, resultRef }: itemProps) => {
  const { t } = useTranslation();
  const { theme, oppositeTheme } = useThemeContext();
  const { genres } = useGetGenres();
  const {
    comicName,
    setComicName,
    filterAuthor,
    setFilterAuthor,
    filterState,
    setFilterState,
    filterSort,
    setFilterSort,
    filterGenres,
    setFilterGenres,
    showAdvancedSearch,
    setShowAdvancedSearch,
    handleSearchComic,
    initialComicsResult,
  } = useSearchState();

  useEffect(() => {
    setComics(initialComicsResult);
  }, [initialComicsResult]);

  const handleSelectGenre = (e: CheckboxChangeEvent) => {
    let selectedGenres = [...filterGenres];

    if (e.checked) selectedGenres.push(e.value);
    else selectedGenres.splice(selectedGenres.indexOf(e.value), 1);

    setFilterGenres(selectedGenres);
  };

  const scrollToResult = () => {
    resultRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const searchAndSearchResult = async () => {
    const comics = await handleSearchComic();
    setComics(comics);
    scrollToResult();
  };

  return (
    <div
      className={`bg-${theme} border border-${oppositeTheme} text-${oppositeTheme} p-4`}
    >
      <div
        title={t("searchAction.label", { ns: "search" })}
        className="flex gap-2 items-center text-xl font-bold mobile:text-lg "
      >
        <i className="pi pi-search"></i>
        <span>{t("searchAction.label", { ns: "search" })}</span>
      </div>
      <Divider type="solid" />
      <div className="flex items-center">
        <input
          className={`w-[100%] p-2 text-black border border-${oppositeTheme}`}
          type="text"
          placeholder={t("searchAction.placeholder", { ns: "search" })}
          value={comicName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setComicName(event.target.value)
          }
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              searchAndSearchResult();
            }
          }}
        />
        <i
          className="pi pi-search px-4 py-2 cursor-pointer"
          onClick={() => {
            searchAndSearchResult();
          }}
        ></i>
      </div>
      <div
        className="flex items-center gap-2 justify-end mt-4 cursor-pointer"
        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
      >
        <i className="pi pi-filter-fill"></i>
        <div title="Tìm kiếm truyện">
          {t("advanceSearch.label", { ns: "search" })}
        </div>
      </div>
      {showAdvancedSearch && (
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="author">
                {t("advanceSearch.author.label", { ns: "search" })}
              </label>
              <InputText
                type="author"
                id="author"
                placeholder={t("advanceSearch.author.placeholder", {
                  ns: "search",
                })}
                aria-describedby="username-help"
                className="w-[100%]"
                value={filterAuthor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilterAuthor(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="status">
                {t("advanceSearch.status.label", { ns: "search" })}
              </label>
              <Dropdown
                id="status"
                value={filterState}
                onChange={(e: DropdownChangeEvent) => setFilterState(e.value)}
                options={optionStatus}
                optionLabel="name"
                placeholder={t("advanceSearch.status.placeholder", {
                  ns: "search",
                })}
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="sort">
                {t("advanceSearch.sort.label", { ns: "search" })}
              </label>
              <Dropdown
                id="sort"
                value={filterSort}
                onChange={(e: DropdownChangeEvent) => setFilterSort(e.value)}
                options={optionSort}
                optionLabel="name"
                placeholder={t("advanceSearch.sort.placeholder", {
                  ns: "search",
                })}
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4">
              {t("advanceSearch.genre.label", { ns: "search" })}
            </h2>
            <div className="grid grid-cols-4 mobile:grid-cols-3 gap-2">
              {genres.map((genre) => (
                <div
                  className="flex align-items-center"
                  title={`${genre.name} ${genre.slug}`}
                  key={genre.slug}
                >
                  <Checkbox
                    inputId={genre.slug}
                    value={genre.slug}
                    onChange={handleSelectGenre}
                    checked={filterGenres.includes(genre.slug)}
                  />
                  <label htmlFor={genre.slug} className="ml-2 mobile:text-xs">
                    {genre.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxSearch;
