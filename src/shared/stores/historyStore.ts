const HistoryStoreManager = () => {
  let historyComics: Comic[] = [];
  const HISTORY_COMICS_STORAGE = "historyComics";

  const getHistoryComics = () => {
    const storage = window.localStorage.getItem(HISTORY_COMICS_STORAGE);
    if (storage) {
      historyComics = JSON.parse(storage) ?? [];
    }

    return historyComics;
  };

  const setHistoryComics = (comic: Comic) => {
    const isExisted = historyComics.find(
      (historyComic) => historyComic.id === comic.id
    );

    if (isExisted) {
      return;
    }

    historyComics.push(comic);
    window.localStorage.setItem(
      HISTORY_COMICS_STORAGE,
      JSON.stringify(historyComics)
    );
    historyComics = historyComics;
  };

  const deleteHistoryComics = () => {
    historyComics = [];
    window.localStorage.removeItem(HISTORY_COMICS_STORAGE);
  };

  return {
    getHistoryComics,
    setHistoryComics,
    deleteHistoryComics,
  };
};

export default HistoryStoreManager();
