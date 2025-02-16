import { usePageContext } from "./Context";
import { originalURL } from "@/shared/libs/config";
import { Breadcrumb } from "@/shared/components/base-components";

export const BreadCrumb = () => {
  const { comic, chapter } = usePageContext();
  const items = [
    { title: comic?.name ?? "", href: `${originalURL}/truyen/${comic?.slug}` },
    {
      title: chapter?.name ?? "",
      href: `${originalURL}/truyen/${comic?.slug}/${chapter?.slug}`,
    },
  ];

  return (
    <div className="mb-5">
      <Breadcrumb items={items} />
    </div>
  );
};
