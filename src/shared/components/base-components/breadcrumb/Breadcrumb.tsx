import { Breadcrumb } from "antd";
import React from "react";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { ChevronRight, House } from "lucide-react";

interface BreadcrumbProps {
  title: string;
  href?: string;
}

interface ComponentProps {
  items: BreadcrumbProps[];
}

const Component = ({ items = [] }: ComponentProps) => {
  const { oppositeTheme, theme } = useThemeContext();

  const convertItems = () => {
    return items.map((item) => {
      return {
        ...item,
        title: (
          <span
            className={`flex items-center mobile:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-sm mobile:text-xs !text-${oppositeTheme}`}
          >
            {item.title}
          </span>
        ),
      };
    });
  };
  return (
    <Breadcrumb
      className="flex items-center"
      separator=<ChevronRight color={theme === "light" ? "black" : "white"} />
      items={[
        {
          href: "/",
          title: <House color={theme === "light" ? "black" : "white"} />,
        },
        ...convertItems(),
      ]}
    />
  );
};

export { Component as Breadcrumb };
