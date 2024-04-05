import { convertWebpResource, shortImageName } from "@/shared/helpers/helpers";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

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
        className="mobile:w-[100%] w-[800px]"
      >
        {shortImageName(images).map((image, _index) => (
          <SwiperSlide key={_index}>
            <div className="flex items-center justify-center">
              <Image
                loading="lazy"
                width={0}
                height={0}
                className="w-[80%] mobile:w-[100%] object-fit"
                src={convertWebpResource(image)}
                alt={`${chapterName}-${comicName}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ChapterViewTypeSlide;
