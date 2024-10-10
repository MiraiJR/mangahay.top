import { useEffect } from "react";
import historyStore from "../stores/historyStore";

export const useUpdateHistory = (
  comic?: Comic,
  isUpdateChapter: boolean = false,
  chapter?: Chapter
) => {
  useEffect(() => {
    if (comic) {
      historyStore.setHistoryComics(
        {
          ...comic,
          chapters: chapter ? [chapter] : [],
        },
        isUpdateChapter
      );
    }
  }, [comic, chapter]);
};
