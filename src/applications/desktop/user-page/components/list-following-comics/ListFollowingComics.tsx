import Link from "next/link";
import MyLoading from "@/shared/components/base-components/loading/MyLoading";
import EmptyComic from "@/shared/components/EmptyComic";
import { useGetListFollowedComic } from "./useGetListFollowedComic";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useFollowComic } from "@/shared/hooks/useFollowComic";
import { Avatar, Button, List, Popconfirm } from "antd";

const ListFollowingComics = () => {
  const { t } = useTranslation();
  const {
    comics,
    isLoading,
    refetch: refetchListFollowedComic,
  } = useGetListFollowedComic();
  const { handleFollow, isSuccess } = useFollowComic();

  useEffect(() => {
    if (isSuccess) {
      refetchListFollowedComic();
    }
  }, [isSuccess]);

  return (
    <div className="card">
      {isLoading ? (
        <MyLoading />
      ) : comics.length === 0 ? (
        <EmptyComic
          content={t("followingComicPage.emptyList", { ns: "profile" })}
        />
      ) : (
        <List
          loading={isLoading}
          dataSource={comics}
          renderItem={(comic) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={100}
                    shape="square"
                    src={comic.thumb}
                    alt={comic.name}
                  />
                }
                title={
                  <Link
                    href={`/truyen/${comic.slug}`}
                    className="font-bold text-black"
                    prefetch={false}
                  >
                    {comic.name}
                  </Link>
                }
                description={
                  <div className="flex flex-row justify-between">
                    {comic.chapters.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <h2>Chương mới nhất:</h2>
                        <Link
                          href={`/truyen/${comic.slug}/${comic.chapters[0].slug}`}
                        >
                          {comic.chapters[0].name}
                        </Link>
                      </div>
                    ) : (
                      <span>Không có chương</span>
                    )}
                    <Popconfirm
                      title="Huỷ theo dõi truyện"
                      description={`Bạn muốn huỷ theo dõi truyện [${comic.name}]?`}
                      onConfirm={() =>
                        handleFollow({ comicId: comic.id, isFollowed: false })
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        color="danger"
                        variant="solid"
                        className="!py-1 !px-2 w-fit mobile:text-xs"
                      >
                        {t("followingComicPage.action.unfollow", {
                          ns: "profile",
                        })}
                      </Button>
                    </Popconfirm>
                  </div>
                }
              />
            </List.Item>
          )}
          // pagination={{
          //   total: total,
          //   pageSize: size,
          //   current: page,
          //   onChange(page, pageSize) {
          //     setPage(page);
          //     setSize(pageSize);
          //   },
          // }}
        />
      )}
    </div>
  );
};

export default ListFollowingComics;
