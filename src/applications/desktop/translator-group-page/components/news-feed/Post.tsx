import { Avatar, Button, Popover } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { translatorGroup } from "../../constant";
import { useState } from "react";
import { formatDate } from "@/shared/helpers/formatter";

interface PostProps {
  post: TranslatorGroupPost;
}

export const Post = ({ post }: PostProps) => {
  const [isOpenMoreButton, setIsOpenMoreButton] = useState<boolean>(false);
  const moreMenuTemplate = () => {
    return (
      <div>
        <Button danger type="text" block>
          Xoá
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row gap-4 justify-between border border-gray-400 p-5 my-4 rounded-sm">
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              shape="circle"
              size={50}
              icon={<UserOutlined />}
              src={translatorGroup.avatar}
            />
            <div className="flex flex-col justify-evenly">
              <h1 className="font-bold text-black">{translatorGroup.name}</h1>
              <h2>{formatDate(post.updatedAt)}</h2>
            </div>
          </div>
          <div>
            <Popover
              content={moreMenuTemplate()}
              trigger="click"
              placement="rightBottom"
              open={isOpenMoreButton}
              onOpenChange={() => {
                setIsOpenMoreButton(!isOpenMoreButton);
              }}
            >
              <Button icon={<MoreOutlined />} />
            </Popover>
          </div>
        </div>
        <div className="my-2">{post.content}</div>
      </div>
      <img
        className="w-[400px] object-cover border border-black rounded-xl"
        src={translatorGroup.thumbnail}
        alt="ảnh bìa nhóm"
      />
    </div>
  );
};
