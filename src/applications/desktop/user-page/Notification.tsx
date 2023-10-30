import MeService from "@/shared/services/meService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import EmptyImage from "@/shared/assets/empty.webp";
import CardNotify from "@/shared/components/card/CardNotify";
import { ProgressSpinner } from "primereact/progressspinner";

const Notification = () => {
  const [notifies, setNotifies] = useState<Notify[] | null>(null);

  useEffect(() => {
    const getNotifies = async () => {
      try {
        const { data } = await MeService.getNotifies(null);

        setNotifies(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getNotifies();
  }, []);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="pt-4 text-center font-bold text-xl">
        Danh sách thông báo
      </div>
      {notifies ? (
        notifies.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center">
            <Image
              width={200}
              height={200}
              src={EmptyImage}
              alt="Không có truyện"
              priority
            />
            <span>Không có thông báo</span>
          </div>
        ) : (
          <div className="w-[100%]">
            {notifies.map((notify) => (
              <CardNotify notify={notify} imageHeight={150} key={notify.id} />
            ))}
          </div>
        )
      ) : (
        <div className="flex items-center justify-center w-[100%] col-span-12">
          <ProgressSpinner
            style={{ width: "100px", height: "100px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
