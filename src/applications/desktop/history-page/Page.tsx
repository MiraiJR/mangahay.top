import historyStore from "@/shared/stores/historyStore";
import { useEffect, useState, useContext } from "react";
import ListComics from "../search-page/ListComics";
import themeStore from "@/shared/stores/themeStore";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

const HistoryPage = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const {} = useContext(ThemeContext);

  useEffect(() => {
    setComics(historyStore.getHistoryComics());
  }, []);

  return (
    <div className={`bg-${themeStore.getTheme()}`}>
      <ListComics comics={comics} title={"Lịch sử đọc truyện"} />
    </div>
  );
};

export default HistoryPage;
