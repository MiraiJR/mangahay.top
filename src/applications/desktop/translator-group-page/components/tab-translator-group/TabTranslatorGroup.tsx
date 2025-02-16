import { Tabs, TabsProps } from "antd";
import React from "react";
import { MemberTable } from "../translator-group/MemberTable";
import { NewsFeed } from "../news-feed/NewsFeed";
import { Rules } from "../translator-group/Rules";
import { RecruitPosition } from "../translator-group/RecruitPosition";
import { ListJoinedComic } from "../list-joined-comic/ListJoinedComic";

interface TabTranslatorGroupProps {}

export const TabTranslatorGroup = ({}: TabTranslatorGroupProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin mới",
      children: React.createElement(NewsFeed),
    },
    {
      key: "2",
      label: "Truyện đã tham gia",
      children: React.createElement(ListJoinedComic),
    },
    {
      key: "3",
      label: "Thành viên",
      children: React.createElement(MemberTable),
    },
    {
      key: "4",
      label: "Thông tin tuyển thành viên",
      children: React.createElement(RecruitPosition),
    },
    {
      key: "5",
      label: "Nội quy",
      children: React.createElement(Rules),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
