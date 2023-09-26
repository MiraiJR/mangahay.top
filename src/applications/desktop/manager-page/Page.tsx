import { useState, useContext } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import CreateComicForm from "./CreateComicForm";
import CrawlChapterFromFacebook from "./CrawlChapterFromFacebook";
import ListCreatedComics from "./ListCreatedComics";
import CreateChapterForm from "./CreateChapterForm";

const ManagerPage = () => {
  const [showCreateComic, setShowCreateComic] = useState<boolean>(false);
  const [showCreateChapter, setShowCreateChapter] = useState<boolean>(false);
  const [showListCreatedComics, setShowListCreatedComics] =
    useState<boolean>(true);
  const [showCrawlChapterFromFacebook, setShowCrawlChapterFromFacebook] =
    useState<boolean>(false);
  const {} = useContext(ThemeContext);
  const items: MenuItem[] = [
    {
      label: "Truyện đã đăng",
      command: () => {
        setShowListCreatedComics(true);
        setShowCreateComic(false);
        setShowCrawlChapterFromFacebook(false);
        setShowCreateChapter(false);
      },
    },
    {
      label: "Tạo truyện",
      command: () => {
        setShowCreateComic(true);
        setShowCrawlChapterFromFacebook(false);
        setShowListCreatedComics(false);
        setShowCreateChapter(false);
      },
    },
    {
      label: "Tạo chương mới",
      command: () => {
        setShowCreateChapter(true);
        setShowCreateComic(false);
        setShowCrawlChapterFromFacebook(false);
        setShowListCreatedComics(false);
      },
    },
    {
      label: "Cào chapter (Facebook)",
      command: () => {
        setShowCrawlChapterFromFacebook(true);
        setShowCreateComic(false);
        setShowListCreatedComics(false);
        setShowCreateChapter(false);
      },
    },
  ];

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu model={items} />
      </div>
      <div className="mt-5 p-2">
        {showCreateChapter && <CreateChapterForm />}
      </div>
      <div>{showListCreatedComics && <ListCreatedComics />}</div>
      <div className="mt-5 p-2">{showCreateComic && <CreateComicForm />}</div>
      <div className="p-2">
        {showCrawlChapterFromFacebook && <CrawlChapterFromFacebook />}
      </div>
    </div>
  );
};

export default ManagerPage;
