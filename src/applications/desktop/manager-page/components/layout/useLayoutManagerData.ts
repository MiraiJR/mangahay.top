import React, { useState } from "react";
import {
  BookFilled,
  FileAddFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export const useLayoutManagerData = () => {
  const [indexActiveTab, setIndexActiveTab] = useState<number>(1);
  const sideBarItems: MenuProps["items"] = [
    {
      key: "1",
      icon: React.createElement(BookFilled),
      label: `Truyện đang quản lý`,
      onClick: () => {
        setIndexActiveTab(1);
      },
    },
    {
      key: "2",
      icon: React.createElement(FileAddFilled),
      label: `Đăng tryện`,
      onClick: () => {
        setIndexActiveTab(2);
      },
    },
    {
      key: "3",
      icon: React.createElement(FileAddFilled),
      label: `Đăng chương`,
      onClick: () => {
        setIndexActiveTab(3);
      },
    },
    {
      key: "4",
      icon: React.createElement(FileAddFilled),
      label: `Cào chương`,
      onClick: () => {
        setIndexActiveTab(4);
      },
    },
    {
      key: "5",
      icon: React.createElement(UsergroupAddOutlined),
      label: `Nhóm dịch`,
      onClick: () => {
        setIndexActiveTab(5);
      },
    },
  ];

  return {
    sideBarItems,
    indexActiveTab,
  };
};
