import { useSearchManagedComics } from "@/shared/hooks/useSearchManagedComics";
import { globalStore } from "@/shared/stores/global-storage";
import { AutoComplete } from "antd";

interface AutoCompleteManagedComicProps {
  label?: string;
  onSelect: Function;
  excludedIds?: number[];
  required?: boolean;
}

export const AutoCompleteManagedComic = ({
  onSelect,
  excludedIds = [],
  label,
  required,
}: AutoCompleteManagedComicProps) => {
  const { isMobile } = globalStore();
  const { listResultComicNameAndId, setComicName } = useSearchManagedComics();

  const onSearch = async (text: string) => {
    if (text.trim() === "") {
      return;
    }

    setComicName(text);
  };

  return (
    <>
      {label && (
        <label
          htmlFor="autocomplete"
          className={`${
            required ? "desktop:text-sm text-red-400" : "text-black"
          }`}
        >
          {label}
          {required ? " *" : ""}
        </label>
      )}
      <AutoComplete
        id="autocomplete"
        size={isMobile ? "middle" : "large"}
        options={listResultComicNameAndId}
        onSelect={(selectedOption) => {
          onSelect(selectedOption);
        }}
        onSearch={onSearch}
        placeholder="Tìm truyện đang quản lý"
      />
    </>
  );
};
