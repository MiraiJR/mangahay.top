import { usePageContext } from "./Context";
import { t } from "i18next";
import { Breadcrumb } from "@/shared/components/base-components";

export const BreadCrumb = () => {
  const { comic } = usePageContext();

  return (
    <div className="mb-5">
      <Breadcrumb
        items={[
          {
            title: t("comic", { ns: "common" }),
          },
          {
            href: `/truyen/${comic?.slug}`,
            title: comic?.name,
          },
        ]}
      />
    </div>
  );
};
