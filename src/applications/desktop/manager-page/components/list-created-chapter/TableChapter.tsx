import {
  Avatar,
  Button,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableColumnsType,
} from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { formatDate } from "@/shared/helpers/helpers";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import { useDeleteSingleChapter } from "./useDeleteSingleChapter";
import { useTableChapterState } from "./useTableChapterState";
import MyLoading from "@/shared/components/MyLoading";
import { ModelUpdateChapter } from "./ModelUpdateChapter";
import { useState } from "react";

interface TableChapterProps {
  comicId: number;
  isCreatorComic?: boolean;
}

export const TableChapter = ({
  comicId,
  isCreatorComic,
}: TableChapterProps) => {
  const {
    isLoading,
    totalChapters,
    chapters,
    permissions,
    setPageGetChapters,
    setSizeGetChapters,
    sizeGetChapters,
  } = useTableChapterState(comicId);
  const { handleDeleteSingleChapter, isLoading: isDeleteLoading } =
    useDeleteSingleChapter(comicId);
  const [isOpenModelUpdateChapter, setIsOpenModelUpdateChapter] =
    useState<boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<string>("");

  if (isLoading) {
    return <MyLoading />;
  }

  const columns: TableColumnsType<Chapter> = [
    { title: "Position", dataIndex: "order", key: "order" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "The number of images",
      key: "imagesCount",
      render: (chapter) => chapter.images.length,
    },
    {
      title: "Creator",
      key: "creator",
      render: (chapter) => (
        <div className="flex gap-2 flex-wrap">
          <Avatar
            src={chapter.creator?.avatar}
            size={24}
            icon={<UserOutlined />}
          />
          <p className="m-0">{chapter.creator?.fullname}</p>
        </div>
      ),
    },
    {
      title: "Updated at",
      key: "updatedAt",
      render: (chapter) => formatDate(chapter.updatedAt),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (chapter) => actionTemplate(chapter),
    },
  ];

  const deleteChapter = (chapterId: number) => {
    handleDeleteSingleChapter(chapterId);
  };

  const cancel: PopconfirmProps["onCancel"] = () => {};

  const actionTemplate = (chapter: Chapter) => {
    const canRemove =
      isCreatorComic ||
      permissions.includes(ComicPrivilegePermission.REMOVE_CHAPTER);

    const canUpdate =
      isCreatorComic ||
      permissions.includes(ComicPrivilegePermission.UPDATE_CHAPTER);

    return (
      <div className="flex gap-2">
        {canRemove && (
          <Popconfirm
            placement="bottom"
            title={`Delete [${chapter.name}]?`}
            description="Are you sure to delete this chapter?"
            onConfirm={() => deleteChapter(chapter.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={isDeleteLoading}
            >
              Delete
            </Button>
          </Popconfirm>
        )}
        {canUpdate && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsOpenModelUpdateChapter(true);
              setSelectedChapter(chapter.slug);
            }}
          >
            Update
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <Table<Chapter>
        columns={columns}
        dataSource={chapters}
        pagination={{
          total: totalChapters,
          pageSize: sizeGetChapters,
          onChange(page, pageSize) {
            setPageGetChapters(page);
            setSizeGetChapters(pageSize);
          },
        }}
      />
      {selectedChapter && (
        <ModelUpdateChapter
          isOpen={isOpenModelUpdateChapter}
          changeIsOpen={setIsOpenModelUpdateChapter}
          chapterSlug={selectedChapter}
        />
      )}
    </>
  );
};
