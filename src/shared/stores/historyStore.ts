const isClient = typeof window !== "undefined";

const HistoryStoreManager = () => {
  let historyComics: Comic[] = [];
  const HISTORY_COMICS_STORAGE = "historyComics";

  const getHistoryComics = () => {
    const storage =
      isClient && window.localStorage.getItem(HISTORY_COMICS_STORAGE);
    if (storage) {
      historyComics = JSON.parse(storage) ?? [];
    }

    return historyComics;
  };

  const setHistoryComics = (comic: Comic, isNew: boolean = true) => {
    if (!isNew) {
      historyComics.push(comic);
    } else {
      historyComics = historyComics.map((comicHistory) => {
        if (comic.id === comicHistory.id) {
          comicHistory.chapters = [comic.chapters[0]];
          console.log(comicHistory);
        }

        return comicHistory;
      });
    }

    isClient &&
      window.localStorage.setItem(
        HISTORY_COMICS_STORAGE,
        JSON.stringify(historyComics)
      );
    historyComics = [...historyComics];
  };

  const deleteHistoryComics = () => {
    historyComics = [];
    isClient && window.localStorage.removeItem(HISTORY_COMICS_STORAGE);
  };

  return {
    getHistoryComics,
    setHistoryComics,
    deleteHistoryComics,
  };
};

export default HistoryStoreManager();
