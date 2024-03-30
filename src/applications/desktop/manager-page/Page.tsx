import { useState, useContext, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const CreateComicForm = dynamic(() => import("./CreateComicForm"));
const CrawlChapter = dynamic(() => import("./CrawlChapter"));
const ListCreatedComics = dynamic(() => import("./ListCreatedComics"));
const CreateChapterForm = dynamic(() => import("./CreateChapterForm"));

enum TabType {
  CREATED_COMICS = 0,
  CREATE_COMIC = 1,
  CREATE_CHAPTER = 2,
  CRAWL_CHAPTER = 3,
}

const ManagerPage = () => {
  const router = useRouter();
  const {} = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState<number>(TabType.CREATED_COMICS);

  const items: MenuItem[] = [
    {
      label: "Truyện đã đăng",
      command: () => {
        setActiveTab(TabType.CREATED_COMICS);
        router.replace(`${router.pathname}#${TabType.CREATED_COMICS}`);
      },
    },
    {
      label: "Tạo truyện",
      command: () => {
        setActiveTab(TabType.CREATE_COMIC);
        router.replace(`${router.pathname}#${TabType.CREATE_COMIC}`);
      },
    },
    {
      label: "Tạo chương mới",
      command: () => {
        setActiveTab(TabType.CREATE_CHAPTER);
        router.replace(`${router.pathname}#${TabType.CREATE_CHAPTER}`);
      },
    },
    {
      label: "Cào chapter",
      command: () => {
        setActiveTab(TabType.CRAWL_CHAPTER);
        router.replace(`${router.pathname}#${TabType.CRAWL_CHAPTER}`);
      },
    },
  ];

  useEffect(() => {
    const tabName = router.asPath.split("#")[1] ?? TabType.CREATED_COMICS;
    const tabNameIndex = parseInt(tabName);
    setActiveTab(tabNameIndex);
  }, []);

  return (
    <div>
      <div className="card w-[100%]">
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />
      </div>
      <div className="mt-5 p-2">
        {activeTab === TabType.CREATE_CHAPTER && <CreateChapterForm />}
      </div>
      <div>{activeTab === TabType.CREATED_COMICS && <ListCreatedComics />}</div>
      <div className="mt-5 p-2">
        {activeTab === TabType.CREATE_COMIC && <CreateComicForm />}
      </div>
      <div className="p-2">
        {activeTab === TabType.CRAWL_CHAPTER && <CrawlChapter />}
      </div>
    </div>
  );
};

export default ManagerPage;
