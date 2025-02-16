import {
  Button,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableColumnsType,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteSingleChapter } from "./useDeleteSingleChapter";
import { useTableChapterState } from "./useTableChapterState";
import MyLoading from "@/shared/components/base-components/loading/MyLoading";
import { ModelUpdateChapter } from "./ModelUpdateChapter";
import { useState } from "react";
import { MinimumUser } from "@/shared/components/MinimumUser";
import { formatDate } from "@/shared/helpers/formatter";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";

interface TableChapterProps {
  comicId: number;
  isCreatorComic?: boolean;
}

export const TableChapter = ({
  comicId,
  isCreatorComic = false,
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
  const canRemove =
    isCreatorComic ||
    permissions.includes(ComicPrivilegePermission.REMOVE_CHAPTER);

  const canUpdate =
    isCreatorComic ||
    permissions.includes(ComicPrivilegePermission.UPDATE_CHAPTER);

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
        <MinimumUser
          user={{
            id: chapter.creator.id,
            email: "",
            fullname: chapter.creator.fullname,
            avatar: chapter.creator.avatar,
          }}
        />
      ),
    },
    {
      title: "Updated at",
      key: "updatedAt",
      render: (chapter) => formatDate(chapter.updatedAt),
    },
    {
      title: "Action",
      key: "action",
      render: (chapter) => actionTemplate(chapter),
    },
  ];

  const deleteChapter = (chapterId: number) => {
    handleDeleteSingleChapter(chapterId);
  };

  const cancel: PopconfirmProps["onCancel"] = () => {};

  const actionTemplate = (chapter: Chapter) => {
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
