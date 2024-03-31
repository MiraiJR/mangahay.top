import historyStore from "@/shared/stores/historyStore";
import { useEffect, useState, useContext } from "react";
import themeStore from "@/shared/stores/themeStore";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";

const ListComics = dynamic(
  () => import("../../../shared/components/ListComics")
);

const HistoryPage = () => {
  const [comics, setComics] = useState<Comic[] | null>(null);
  const {} = useContext(ThemeContext);

  useEffect(() => {
    setComics(historyStore.getHistoryComics());
  }, []);

  return (
    <>
      {comics ? (
        <div className={`bg-${themeStore.getTheme()}`}>
          <ListComics comics={comics} title={"Lịch sử đọc truyện"} />
        </div>
      ) : (
        <MyLoading />
      )}
    </>
  );
};

export default HistoryPage;
