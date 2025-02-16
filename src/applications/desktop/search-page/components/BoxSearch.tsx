import React, { ChangeEvent, useEffect } from "react";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { optionSort, optionStatus } from "../constant";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import { useTranslation } from "react-i18next";
import { useSearchState } from "./useSearchState";
import { Checkbox, Input, Select } from "@/shared/components/base-components";
import { Divider } from "antd";

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

  const handleSelectGenre = (checked: boolean, value: string) => {
    let selectedGenres = [...filterGenres];

    if (checked) selectedGenres.push(value);
    else selectedGenres.splice(selectedGenres.indexOf(value), 1);

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
      className={`bg-${theme} border border-${oppositeTheme} text-${oppositeTheme} p-4 mobile:text-xs`}
    >
      <div
        title={t("searchAction.label", { ns: "search" })}
        className="flex gap-2 items-center text-xl font-bold mobile:text-xs"
      >
        <i className="pi pi-search"></i>
        <span>{t("searchAction.label", { ns: "search" })}</span>
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <div className="flex flex-1 items-center">
        <Input
          className={`p-2 text-black border border-${oppositeTheme}`}
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
            <Input
              label={t("advanceSearch.author.label", { ns: "search" })}
              id="author"
              placeholder={t("advanceSearch.author.placeholder", {
                ns: "search",
              })}
              className="w-[100%]"
              value={filterAuthor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterAuthor(e.target.value)
              }
            />
            <Select
              label={t("advanceSearch.status.label", { ns: "search" })}
              id="status"
              value={filterState}
              onChange={(value) => setFilterState(value)}
              options={optionStatus}
              placeholder={t("advanceSearch.status.placeholder", {
                ns: "search",
              })}
              className="w-full md:w-14rem"
            />
            <Select
              id="sort"
              value={filterSort}
              onChange={(value) => setFilterSort(value)}
              options={optionSort}
              label={t("advanceSearch.sort.label", { ns: "search" })}
              placeholder={t("advanceSearch.sort.placeholder", {
                ns: "search",
              })}
              className="w-full md:w-14rem"
            />
          </div>
          <div>
            <h2 className="font-bold mb-4">
              {t("advanceSearch.genre.label", { ns: "search" })}
            </h2>
            <div className="grid grid-cols-4 mobile:grid-cols-3 gap-2">
              {genres.map((genre) => (
                <Checkbox
                  value={
                    filterGenres.includes(genre.slug) ||
                    filterGenres.includes(genre.name)
                  }
                  key={genre.slug}
                  label={genre.name}
                  onChange={(value) => handleSelectGenre(value, genre.name)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxSearch;
