import { useTranslation } from "react-i18next";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import {
  Dropdown,
  MenuProps,
  Popconfirm,
  Space,
  Table,
  Image,
  TableColumnsType,
} from "antd";
import {
  BuildOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTableComicManagedByMeData } from "./useTableComicManagedByMeData";
import { DialogPrivilegeComic } from "@/applications/desktop/manager-page/components/privilege-comic/DialogPrivilegeComic";
import { DialogListManagedChapter } from "@/applications/desktop/manager-page/components/list-created-chapter/DialogListManagedChapter";
import { ReorderListChapter } from "@/applications/desktop/manager-page/components/reorder-chapter/ReorderListChapter";
import { ModalUpdateComic } from "@/applications/desktop/manager-page/components/update-comic/ModalUpdateComic";
import { UploadImageProvider } from "@/shared/components/base-components/upload-files/UploadImageContext";
import { formatDate } from "@/shared/helpers/formatter";

export const TableComicsManagedByMe = () => {
  const { t } = useTranslation();
  const {
    selectedComic,
    comics,
    totalComics,
    setPage,
    setSize,
    size,
    isShowUserRight,
    setIsShowUserRight,
    isShowListManagedChapter,
    setIsShowListManagedChapter,
    isShowReorderChapter,
    setIsShowReorderChapter,
    isLoadingListMyCreatedComic,
    isCreator,
    userProfile,
    isShowUpdateComic,
    setIsShowUpdateComic,
    setSelectedComic,
    handleDeleteComic,
    getPermissionText,
  } = useTableComicManagedByMeData();

  const columns: TableColumnsType<Comic> = [
    {
      title: "Bìa",
      key: "thumb",
      render: (comic: Comic) => <Image width={50} src={comic.thumb} />,
    },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Tác giả",
      key: "authors",
      render: (comic: Comic) => <span>{comic.authors.join(", ")}</span>,
    },
    {
      title: "Thể loại",
      key: "genres",
      render: (comic: Comic) => <span>{comic.genres.join(", ")}</span>,
    },
    {
      title: "Số lượng chương",
      key: "chapterCount",
      render: (comic) => comic.chapters.length,
    },
    {
      title: "Người tạo",
      key: "creator",
      render: (comic) => (
        <p
          className={`${
            comic.creator.id === userProfile?.id ? "text-red-500 font-bold" : ""
          }`}
        >
          {comic.creator?.fullname}
        </p>
      ),
    },
    {
      title: "Thời gian cập nhật",
      key: "updatedAt",
      render: (chapter) => formatDate(chapter.updatedAt),
    },
    {
      title: "Quyền",
      key: "privilege",
      render: (comic: Comic) => (
        <span className="text-red-500 font-bold">
          {getPermissionText(comic).join(", ")}
        </span>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "action",
      render: (chapter) => actionTemplate(chapter),
    },
  ];

  const actionTemplate = (comic: Comic) => {
    const isCreatorComic = isCreator(comic);
    const canInteractionWithChapter =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.REMOVE_CHAPTER) ||
      comic.privileges.includes(ComicPrivilegePermission.UPDATE_CHAPTER);
    const canRemove =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.REMOVE_COMIC);
    const canUpdate =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.UPDATE_COMIC);

    const isMe = userProfile?.id === comic.creatorId;

    const actionItems: MenuProps["items"] = [
      {
        label: (
          <Space>
            <UnorderedListOutlined />
            <span>Danh sách chương</span>
          </Space>
        ),
        key: "1",
        onClick: () => {
          setSelectedComic(comic);
          setIsShowListManagedChapter(true);
        },
        disabled: !canInteractionWithChapter,
      },
      {
        label: (
          <Space>
            <BuildOutlined />
            <span>Sắp xếp chương</span>
          </Space>
        ),
        key: "2",
        onClick: () => {
          setSelectedComic(comic);
          setIsShowReorderChapter(true);
        },
        disabled: !canInteractionWithChapter,
      },
      {
        label: (
          <Space>
            <EditOutlined />
            <span>Sửa truyện</span>
          </Space>
        ),
        key: "3",
        onClick: () => {
          setSelectedComic(comic);
          setIsShowUpdateComic(true);
        },
        disabled: !canUpdate,
      },
      {
        label: (
          <Popconfirm
            placement="left"
            title={"Xoá truyện"}
            description={t("confirmDelete", {
              ns: "common",
              comicName: comic.name,
            })}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteComic(comic.id);
            }}
          >
            <Space>
              <DeleteOutlined />
              <span>Xoá truyện</span>
            </Space>
          </Popconfirm>
        ),
        key: "4",
        disabled: !canRemove,
      },
      {
        label: (
          <Space>
            <UserOutlined />
            <span>Danh sách quyền</span>
          </Space>
        ),
        key: "5",
        onClick: () => {
          setSelectedComic(comic);
          setIsShowUserRight(true);
        },
        disabled: !isMe,
      },
    ];

    return (
      <div className="flex gap-2">
        <Dropdown menu={{ items: actionItems }} trigger={["click"]}>
          <Space>
            Action
            <DownOutlined />
          </Space>
        </Dropdown>
        {selectedComic && (
          <>
            <DialogPrivilegeComic
              comicId={selectedComic.id}
              visible={isShowUserRight}
              changeVisible={setIsShowUserRight}
            />
            <DialogListManagedChapter
              visible={isShowListManagedChapter}
              changeVisible={setIsShowListManagedChapter}
              comicId={selectedComic.id}
              isCreatorComic={isCreator(selectedComic)}
            />
            <ReorderListChapter
              visible={isShowReorderChapter}
              changeVisible={setIsShowReorderChapter}
              comicId={selectedComic.id}
            />
            <UploadImageProvider>
              <ModalUpdateComic
                visible={isShowUpdateComic}
                changeVisible={setIsShowUpdateComic}
                comicSlug={selectedComic.slug}
              />
            </UploadImageProvider>
          </>
        )}
      </div>
    );
  };

  return (
    <Table<Comic>
      columns={columns}
      dataSource={comics}
      loading={isLoadingListMyCreatedComic}
      pagination={{
        total: totalComics,
        pageSize: size,
        onChange(page, pageSize) {
          setPage(page);
          setSize(pageSize);
        },
      }}
    />
  );
};
