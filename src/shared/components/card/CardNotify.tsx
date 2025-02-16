import { useNotificationContext } from "@/shared/contexts/NotificationContext";
import { cn } from "@/shared/libs/utils";
import NotifyService from "@/shared/services/notifyService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MentionImage from "@/shared/assets/mention.png";
import { formatDate } from "@/shared/helpers/formatter";

interface itemProps {
  notify: Notify;
  imageHeight?: number;
}

const CardNotify = ({ notify, imageHeight }: itemProps) => {
  const [data, setData] = useState<Notify>(notify);
  const router = useRouter();
  const { refetchNotification } = useNotificationContext();

  const thumb = () => {
    switch (notify.module) {
      case "comment":
        return MentionImage;
      default:
        return notify.thumb;
    }
  };

  const handleReadNotify = async () => {
    try {
      const { data } = await NotifyService.changeState(notify.id);

      setData(data);
      refetchNotification();
      router.push(`${notify.redirectUrl}`);
    } catch (error: any) {}
  };

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 cursor-pointer items-center hover:bg-slate-200 py-2",
        {
          "bg-slate-400": data.isRead,
        }
      )}
      onClick={handleReadNotify}
    >
      <Image
        width={1}
        height={1}
        className={`col-span-2 col w-[100%] h-[${imageHeight}px] object-cover object-top`}
        src={thumb()}
        alt="thông báo"
      />
      <div className="col-span-10 flex flex-col">
        <h2
          title={data.title}
          className="capitalize font-bold text-md"
          dangerouslySetInnerHTML={{ __html: data.title }}
        ></h2>
        <h2
          title={data.body}
          className="capitalize text-md break-all line-clamp-2"
          dangerouslySetInnerHTML={{ __html: data.body }}
        ></h2>
        <span className="text-sm w-[100%] text-right">
          {formatDate(data.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CardNotify;
