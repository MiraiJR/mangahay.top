import { useGetChapter } from "@/shared/hooks/useGetChapter";
import { useGetComic } from "@/shared/hooks/useGetComic";
import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { useUpdateHistory } from "@/shared/hooks/useUpdateHistory";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ContextProps {
  comic?: Comic;
  chapter?: Chapter;
  chapters: Chapter[];
}

const Context = createContext<ContextProps | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const { comic } = useGetComic();
  const { chapter } = useGetChapter();
  const { chapters } = useGetListChapter(comic?.id ?? 0);
  const { increaseView } = useIncreaseViewComic();
  useUpdateHistory(comic, true, chapter);

  useEffect(() => {
    if (comic) {
      increaseView(comic.id);
    }
  }, [comic]);

  return (
    <Context.Provider
      value={{
        comic,
        chapter,
        chapters: chapters ?? [],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("usePageContext must be used within PageProvider");
  }

  return context;
};
