import { Divider } from "primereact/divider";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { optionSort, optionStatus } from "./constant";
import { useSearchState } from "./useSearchState";
import { useGetGenres } from "@/shared/hooks/useGetGenres";

interface itemProps {
  setComics: any;
  resultRef: any;
}

const BoxSearch = ({ setComics, resultRef }: itemProps) => {
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
    initialSearchResult,
  } = useSearchState();

  useEffect(() => {
    setComics(initialSearchResult);
  }, []);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _filterGenres = [...filterGenres];

    if (e.checked) _filterGenres.push(e.value);
    else _filterGenres.splice(_filterGenres.indexOf(e.value), 1);

    setFilterGenres(_filterGenres);
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
        title="Tìm kiếm truyện"
        className="flex gap-2 items-center text-xl font-bold mobile:text-lg "
      >
        <i className="pi pi-search"></i>
        <span>Tìm kiếm truyện</span>
      </div>
      <Divider type="solid" />
      <div className="flex items-center">
        <input
          className={`w-[100%] p-2 text-black border border-${oppositeTheme}`}
          type="text"
          placeholder="Nhập tên truyện cần tìm"
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
        <div title="Tìm kiếm truyện">Tìm kiếm nâng cao</div>
      </div>
      {showAdvancedSearch && (
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="author">Tác giả</label>
              <InputText
                type="author"
                id="author"
                placeholder="Nhập tên tác giả"
                aria-describedby="username-help"
                className="w-[100%]"
                value={filterAuthor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilterAuthor(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="status">Trạng thái</label>
              <Dropdown
                id="status"
                value={filterState}
                onChange={(e: DropdownChangeEvent) => setFilterState(e.value)}
                options={optionStatus}
                optionLabel="name"
                placeholder="Trạng thái"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="sort">Sắp xếp</label>
              <Dropdown
                id="sort"
                value={filterSort}
                onChange={(e: DropdownChangeEvent) => setFilterSort(e.value)}
                options={optionSort}
                optionLabel="name"
                placeholder="Sắp xếp"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4">Thể loại</h2>
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
                    onChange={onIngredientsChange}
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
