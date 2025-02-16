import CardNotify from "../card/CardNotify";
import { Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useListNotification } from "./useListNotification";

export const ListNotification = () => {
  const { notifications, loadMore, total } = useListNotification();

  return (
    <div
      id="list_notification"
      style={{
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={notifications.length}
        next={loadMore}
        height={400}
        hasMore={notifications.length < total}
        loader={
          <Skeleton className="py-2" avatar paragraph={{ rows: 1 }} active />
        }
        scrollableTarget="list_notification"
      >
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => <CardNotify notify={item} key={item.id} />}
        />
      </InfiniteScroll>
    </div>
  );
};
