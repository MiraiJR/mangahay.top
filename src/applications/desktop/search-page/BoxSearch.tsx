import { Divider } from "primereact/divider";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { toast } from "react-toastify";
import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";

interface itemProps {
  setComics: any;
  selectedGenres: string[];
  resultRef: any;
}

interface OptionStatus {
  name: string;
}

interface OptionSort {
  name: string;
  code: string;
}

const BoxSearch = ({ setComics, selectedGenres, resultRef }: itemProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [comicName, setComicName] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterState, setFilterState] = useState<OptionStatus | null>(null);
  const [filterSort, setFilterSort] = useState<OptionSort | null>(null);
  const [filterGenres, setFilterGenres] = useState<string[]>(
    selectedGenres ?? []
  );
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const optionStatus: OptionStatus[] = [
    { name: "Đang tiến hành" },
    { name: "Tạm ngưng" },
    { name: "Hoàn thành" },
  ];
  const optionSort: OptionSort[] = [
    {
      name: "A->Z",
      code: "az",
    },
    {
      name: "Z->A",
      code: "za",
    },
    {
      name: "Xem nhiều nhất",
      code: "view",
    },
    {
      name: "Thích nhiều nhất",
      code: "like",
    },
    {
      name: "Theo dõi nhiều nhất",
      code: "follow",
    },
    {
      name: "Mới cập nhật",
      code: "updatedAt",
    },
  ];

  useEffect(() => {
    setFilterGenres(selectedGenres);
    const getGenres = async () => {
      try {
        const { data } = await comicService.getGenres();

        setGenres(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    const searchComics = async () => {
      try {
        const { data } = await await comicService.searchComics({
          filterGenres: selectedGenres,
        });

        setComics(data.comics);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getGenres();

    if (selectedGenres.length !== 0) {
      searchComics();
    }
  }, [selectedGenres]);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _filterGenres = [...filterGenres];

    if (e.checked) _filterGenres.push(e.value);
    else _filterGenres.splice(_filterGenres.indexOf(e.value), 1);

    setFilterGenres(_filterGenres);
  };

  const handleSearchComic = async () => {
    window.history.pushState(
      {},
      "",
      `?${comicName !== "" ? `comicName=${comicName}` : ""}&${
        filterAuthor.length !== 0 ? `filterAuthor=${filterAuthor}` : ""
      }&${filterGenres.length !== 0 ? `filterGenres=${filterGenres}` : ""}
      &${filterState ? `filterState=${filterState?.name}` : ""}&${
        filterSort ? `filterSort=${filterSort?.code}` : ""
      }`
    );

    try {
      const { data } = await comicService.searchComics({
        comicName,
        filterAuthor,
        filterGenres,
        filterSort: filterSort?.code,
        filterState: filterState?.name,
      });

      setComics(data.comics);
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`bg-${themeStore.getTheme()} border border-${themeStore.getOppositeTheme()} text-${themeStore.getOppositeTheme()} p-4`}
    >
      <h1
        title="Tìm kiếm truyện"
        className="flex gap-2 items-center text-xl font-bold mobile:text-lg "
      >
        <i className="pi pi-search"></i>
        <span>Tìm kiếm truyện</span>
      </h1>
      <Divider type="solid" />
      <div className="flex items-center">
        <input
          className={`w-[100%] p-2 text-black border border-${themeStore.getOppositeTheme()}`}
          type="text"
          placeholder="Nhập tên truyện cần tìm"
          value={comicName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setComicName(event.target.value)
          }
        />
        <i
          className="pi pi-search px-4 py-2 cursor-pointer"
          onClick={handleSearchComic}
        ></i>
      </div>
      <div
        className="flex items-center gap-2 justify-end mt-4 cursor-pointer"
        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
      >
        <i className="pi pi-filter-fill"></i>
        <h1 title="Tìm kiếm truyện">Tìm kiếm nâng cao</h1>
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
            <h1 className="font-bold mb-4">Thể loại</h1>
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
