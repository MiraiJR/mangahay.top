import { useContext } from "react";
import CardSearchingComic from "../card/CardSearchingComic";
import EmptyImage from "@/shared/assets/empty.webp";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";

interface itemProps {
  comics: Comic[];
}
const ListSearchingComics = ({ comics }: itemProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`absolute w-[100%] bg-${theme} p-4 z-10 shadow-outer-lg-${themeStore.getOppositeTheme()} max-h-[500px] overflow-y-scroll`}
    >
      {comics.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <Image width={100} src={EmptyImage} alt="Không có truyện" priority />
          <span>Không có truyện</span>
        </div>
      ) : (
        <div>
          {comics.map((comic) => (
            <CardSearchingComic comic={comic} key={comic.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListSearchingComics;
