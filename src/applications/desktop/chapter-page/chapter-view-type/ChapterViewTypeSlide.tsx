import { convertWebpResource, shortImageName } from "@/shared/helpers/helpers";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import themeStore from "@/shared/stores/theme-storage";
import { useState } from "react";
import MyLoading from "@/shared/components/MyLoading";

interface itemProps {
  images: string[];
  chapterName: string;
  comicName: string;
  sliderPerView: number;
}

const ChapterViewTypeSlide = ({
  images,
  chapterName,
  comicName,
  sliderPerView,
}: itemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Swiper
        slidesPerView={sliderPerView}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoHeight
        effect={"cards"}
        grabCursor={true}
        className="mobile:w-[100%] w-full"
      >
        {shortImageName(images).map((image, _index) => (
          <SwiperSlide key={_index}>
            <div className="flex flex-col items-center justify-center">
              <div
                className={`my-2 text-lg bg-${themeStore.getOppositeTheme()} rounded-sm text-${themeStore.getTheme()}`}
              >
                Trang {_index + 1}/{images.length}
              </div>
              {isLoading ? (
                <MyLoading />
              ) : (
                <Image
                  loading="lazy"
                  width={0}
                  height={0}
                  className="w-[80%] mobile:w-[100%] object-fit"
                  src={convertWebpResource(image, "best")}
                  alt={`${chapterName}-${comicName}`}
                  onLoad={() => setIsLoading(true)}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              )}
              <div
                className={`my-2 text-lg bg-${themeStore.getOppositeTheme()} rounded-sm text-${themeStore.getTheme()}`}
              >
                Trang {_index + 1}/{images.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ChapterViewTypeSlide;
