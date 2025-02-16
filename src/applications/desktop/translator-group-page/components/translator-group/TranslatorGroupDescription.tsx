import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ChangedImageWithHover } from "@/shared/components/base-components/change-image-hover/ChangedImageWithHover";
import { useState } from "react";
import { DialogChangeImage } from "@/shared/components/base-components/dialog-change-image/DialogChangeImage";

export interface TranslatorGroupDescriptionProps {
  translatorGroup: TranslatorGroup;
}

export const TranslatorGroupDescription = ({
  translatorGroup,
}: TranslatorGroupDescriptionProps) => {
  const [isShowDialogChangeImage, setIsShowDialogChangeImage] =
    useState<boolean>(false);
  const isAdmin = true;

  return (
    <div className="flex items-center relative mb-[100px]">
      <ChangedImageWithHover
        onClickOnIcon={() => {
          setIsShowDialogChangeImage(true);
        }}
        active={isAdmin}
        className="w-full"
      >
        <img
          className="w-full h-[300px] object-cover border border-black rounded-xl"
          src={translatorGroup.thumbnail}
          alt="ảnh bìa nhóm"
        />
      </ChangedImageWithHover>
      <div className="absolute bottom-0 translate-y-1/2 z-1 mx-4 flex items-end w-full">
        <ChangedImageWithHover
          onClickOnIcon={() => {
            setIsShowDialogChangeImage(true);
          }}
          active={isAdmin}
        >
          <Avatar
            shape="square"
            size={150}
            icon={<UserOutlined />}
            src={translatorGroup.avatar}
          />
        </ChangedImageWithHover>
        <div className="w-full flex flex-row  gap-2 items-end ml-2">
          <div>
            <h1 className="text-3xl font-bold text-black">
              {translatorGroup.name}
            </h1>
            <h2>{translatorGroup.description}</h2>
          </div>
        </div>
      </div>
      <DialogChangeImage
        isOpen={isShowDialogChangeImage}
        setIsOpen={setIsShowDialogChangeImage}
        handleOke={() => {}}
        title={"Thay đổi ảnh"}
      />
    </div>
  );
};
