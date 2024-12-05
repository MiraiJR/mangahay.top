import { Avatar, Table, TableColumnsType } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatDate } from "@/shared/helpers/helpers";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";

interface TableChapterProps {
  chapters: Chapter[];
  privileges: number[];
  isCreatorComic?: boolean;
}

export const TableChapter = ({
  chapters,
  privileges,
  isCreatorComic,
}: TableChapterProps) => {
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
        <div className="flex gap-2">
          <Avatar
            src={chapter.creator?.avatar}
            size={24}
            icon={<UserOutlined />}
          />
          <p style={{ margin: 0 }}>{chapter.creator?.fullname}</p>
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

  const updateChapter = (chapterId: number) => {
    alert(chapterId);
  };

  const actionTemplate = (chapter: Chapter) => {
    const canRemove =
      isCreatorComic ||
      privileges.includes(ComicPrivilegePermission.REMOVE_CHAPTER);

    const canUpdate =
      isCreatorComic ||
      privileges.includes(ComicPrivilegePermission.UPDATE_CHAPTER);

    return (
      <>
        {canRemove && <a onClick={() => updateChapter(chapter.id)}>Delete</a>}
        {canUpdate && <a onClick={() => updateChapter(chapter.id)}>Update</a>}
      </>
    );
  };

  return <Table<Chapter> columns={columns} dataSource={chapters} />;
};
