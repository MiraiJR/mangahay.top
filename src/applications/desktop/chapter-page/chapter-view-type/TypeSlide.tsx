import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import MyLoading from "@/shared/components/base-components/loading/MyLoading";
import { usePageContext } from "../Context";
import { useThemeContext } from "@/shared/contexts/ThemeContext";

interface itemProps {
  sliderPerView: number;
}

export const TypeSlide = ({ sliderPerView }: itemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chapter, comic } = usePageContext();
  const { oppositeTheme, theme } = useThemeContext();

  return (
    <Swiper
      slidesPerView={sliderPerView}
      spaceBetween={30}
      autoHeight
      effect={"cards"}
      grabCursor={true}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      className="mobile:w-[100%] w-full"
    >
      {chapter?.images.map((image, _index) => (
        <SwiperSlide key={_index}>
          <div className="flex flex-col items-center justify-center">
            <div
              className={`my-2 text-lg bg-${oppositeTheme} rounded-sm text-${theme} mobile:text-xs`}
            >
              Trang {_index + 1}/{chapter?.images.length}
            </div>
            {isLoading ? (
              <MyLoading />
            ) : (
              <Image
                loading="lazy"
                width={100}
                height={100}
                className="w-fit h-screen mobile:w-[100%] object-fit"
                src={image.relativePath}
                alt={`${chapter?.name}-${comic?.name}`}
                onLoad={() => setIsLoading(true)}
                onLoadingComplete={() => setIsLoading(false)}
              />
            )}
            <div
              className={`my-2 text-lg bg-${oppositeTheme} rounded-sm text-${theme} mobile:text-xs`}
            >
              Trang {_index + 1}/{chapter?.images.length}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
