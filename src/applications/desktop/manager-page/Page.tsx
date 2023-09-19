import { useState, useContext } from "react";
import CreateComicForm from "./CreateComicForm.tsx";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import CrawlChapterFromFacebook from "./CrawlChapterFromFacebook.tsx";
import { ThemeContext } from "@/shared/contexts/ThemeContext.tsx";

const ManagerPage = () => {
  const [showCreateComic, setShowCreateComic] = useState<boolean>(true);
  const [showCrawlChapterFromFacebook, setShowCrawlChapterFromFacebook] =
    useState<boolean>(false);
  const {} = useContext(ThemeContext);
  const items: MenuItem[] = [
    {
      label: "Tạo truyện",
      command: () => {
        setShowCreateComic(true);
        setShowCrawlChapterFromFacebook(false);
      },
    },
    {
      label: "Cào chapter (Facebook)",
      command: () => {
        setShowCreateComic(false);
        setShowCrawlChapterFromFacebook(true);
      },
    },
  ];

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu model={items} />
      </div>

      <div className="mt-5 p-2">{showCreateComic && <CreateComicForm />}</div>
      <div className="mt-5 p-2">
        {showCrawlChapterFromFacebook && <CrawlChapterFromFacebook />}
      </div>
    </div>
  );
};

export default ManagerPage;
