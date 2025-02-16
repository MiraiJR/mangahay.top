import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { THE_NUMBER_OF_COMICS_SLIDE } from "../../constant";
import { Card } from "./Card";
import { Skeleton } from "./Skeleton";
import { Image } from "antd";
import { globalStore } from "@/shared/stores/global-storage";

const SlideComics = () => {
  const { comics, isSuccess, isLoading } = useGetRankingComics("view", 5);
  const [currentComic, setCurrentComic] = useState<Comic | null>(null);
  const { theme, oppositeTheme } = useThemeContext();
  const { isMobile } = globalStore();

  useEffect(() => {
    if (comics.length >= 0) {
      setCurrentComic(comics[0]);
    }
  }, [comics]);

  return (
    <div
      className={`bg-${theme} text-${oppositeTheme} rounded-xl flex items-center mobile:flex-col-reverse justify-between h-max p-10 shadow md:shadow-lg border-${oppositeTheme} border-[1px]`}
    >
      {(isLoading || comics.length === 0) && <Skeleton />}
      {isSuccess && currentComic && <Card comic={currentComic} />}
      {isSuccess && comics.length > 0 && (
        <div>
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              EffectCards,
              Autoplay,
            ]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            scrollbar={{ draggable: true }}
            onSlideChange={(swiper) =>
              setCurrentComic(comics[swiper.activeIndex])
            }
            onSwiper={() => {}}
            autoHeight
            effect={"cards"}
            grabCursor={true}
            className="mobile:w-[200px] w-[500px]"
          >
            {comics.slice(0, THE_NUMBER_OF_COMICS_SLIDE).map((comic) => (
              <SwiperSlide key={comic.id + "-slide-comic"}>
                <div className="flex items-center justify-center">
                  <Image
                    preview={false}
                    height={isMobile ? 200 : 400}
                    src={comic.thumb}
                    alt={comic.name}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SlideComics;
