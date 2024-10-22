import { useState, useContext, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import { DialogProvider } from "@/shared/contexts/DialogContext";
import { useRouter } from "next/router";

const CreateComicForm = dynamic(() => import("./CreateComicForm"), {
  ssr: false,
});
const CrawlChapter = dynamic(() => import("./CrawlChapter"), { ssr: false });
const ListCreatedComics = dynamic(() => import("./ListCreatedComics"), {
  ssr: false,
});
const CreateChapterForm = dynamic(() => import("./CreateChapterForm"), {
  ssr: false,
});

enum TabType {
  CREATED_COMICS = 0,
  CREATE_COMIC = 1,
  CREATE_CHAPTER = 2,
  CRAWL_CHAPTER = 3,
}

const ManagerPage = () => {
  const router = useRouter();
  const { theme, oppositeTheme } = useContext(ThemeContext);
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
    <DialogProvider>
      <div>
        <div className="card w-[100%]">
          <TabMenu
            pt={{
              menu: {
                className: `bg-${theme}`,
              },
              label: {
                className: `text-${oppositeTheme}`,
              },
              action: {
                className: `bg-${theme}`,
              },
            }}
            model={items}
            activeIndex={activeTab}
            onTabChange={(e) => setActiveTab(e.index)}
          />
        </div>
        <div className="mt-5 p-2">
          {activeTab === TabType.CREATE_CHAPTER && <CreateChapterForm />}
          {activeTab === TabType.CREATED_COMICS && <ListCreatedComics />}
          {activeTab === TabType.CREATE_COMIC && <CreateComicForm />}
        </div>
        {activeTab === TabType.CRAWL_CHAPTER && (
          <div className="p-2">
            <CrawlChapter />
          </div>
        )}
      </div>
    </DialogProvider>
  );
};

export default ManagerPage;
