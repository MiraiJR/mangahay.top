import { cn } from "@/shared/libs/utils";
import { useParams } from "next/navigation";
import { usePageContext } from "./Context";
import { Button, Drawer } from "antd";
import { globalStore } from "@/shared/stores/global-storage";
import { useRouter } from "next/router";

interface MenuChapterProps {
  open: boolean;
}

export const MenuChapter = ({ open }: MenuChapterProps) => {
  const { slugChapter = "", slugComic = "" } = useParams();
  const { chapters } = usePageContext();
  const { isMobile } = globalStore();
  const router = useRouter();

  return (
    <Drawer
      title="Danh sách chương"
      placement={"left"}
      closable
      open={open}
      width={isMobile ? 200 : 300}
    >
      <div className="flex flex-col gap-2">
        {chapters.map((chapter) => (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => router.push(`/truyen/${slugComic}/${chapter.slug}`)}
            className={`border-none block p-2 w-full mobile:py-2 mobile:text-sm text-xl mobile:px-5 hover:!bg-slate-400 hover:!text-white`}
            key={chapter.id}
            disabled={slugChapter === chapter.slug}
          >
            {chapter.name}
          </Button>
        ))}
      </div>
    </Drawer>
  );
};
