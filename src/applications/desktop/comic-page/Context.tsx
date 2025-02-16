import { useGetComic } from "@/shared/hooks/useGetComic";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { useUpdateHistory } from "@/shared/hooks/useUpdateHistory";
import { createContext, ReactElement, useContext, useEffect } from "react";
import { useInteractionComic } from "./useInteractionComic";
import { Flex, Spin } from "antd";

interface ContextProps {
  comic: Comic;
  statusInteraction: StatusInteractWithComic;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactElement }) => {
  const { comic } = useGetComic();
  const { increaseView } = useIncreaseViewComic();
  useUpdateHistory(comic);
  const { statusInteractComic: statusInteraction } = useInteractionComic(
    comic?.id ?? 0
  );

  useEffect(() => {
    if (comic) {
      increaseView(comic.id);
    }
  }, [comic]);

  if (!comic) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Context.Provider value={{ comic, statusInteraction }}>
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
