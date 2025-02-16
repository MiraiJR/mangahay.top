import { useRef, useState } from "react";
import BoxSearch from "./components/BoxSearch";
import { ListComic } from "@/shared/components/list/ListComic";
import { useTranslation } from "react-i18next";

export const Body = () => {
  const { t } = useTranslation();
  const resultRef = useRef<any>(null);
  const [comics, setComics] = useState<Comic[]>([]);

  return (
    <>
      <BoxSearch resultRef={resultRef} setComics={setComics} />
      <div ref={resultRef}>
        <ListComic
          title={t("searchResult", { ns: "search" })}
          comics={comics}
        />
      </div>
    </>
  );
};
