import { formatDate, reduceQualityImage } from "@/shared/helpers/helpers";
import { cn } from "@/shared/libs/utils";
import NotifyService from "@/shared/services/notifyService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface itemProps {
  notify: Notify;
  imageWidth?: number;
  imageHeight?: number;
}

const CardNotify = ({ notify, imageWidth, imageHeight }: itemProps) => {
  const [data, setData] = useState<Notify>(notify);
  const router = useRouter();

  const handleReadNotify = async () => {
    try {
      const { data } = await NotifyService.changeState(notify.id);

      setData(data);
      router.push(`${notify.redirectUrl}`);
    } catch (error: any) {}
  };

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 cursor-pointer border border-b-1 items-center",
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
        src={reduceQualityImage(data.thumb)}
        alt="thông báo"
      />
      <div className="col-span-10 flex flex-col">
        <h2 title={data.title} className="capitalize font-bold text-md">
          {data.title}
        </h2>
        <h2 title={data.body} className="capitalize font-thin text-md">
          {data.body}
        </h2>
        <span className="text-sm w-[100%] text-right">
          {formatDate(data.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CardNotify;
