import { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Chip } from "primereact/chip";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import TextAnimation from "@/shared/components/animations/TextAnimation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { reduceQualityImage } from "@/shared/helpers/helpers";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { THE_NUMBER_OF_COMICS_SLIDE } from "../../constant";
import { SlideComicSkeleton } from "./SlideComicSkeleton";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";

const SlideComics = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { comics, isSuccess, isLoading } = useGetRankingComics("view", 5);
  const [currentComic, setCurrentComic] = useState<Comic | null>(null);
  const { theme, oppositeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (comics.length >= 0) {
      setCurrentComic(comics[0]);
    }
  }, [comics]);

  return (
    <div
      className={`bg-${theme} text-${oppositeTheme} rounded-xl flex items-center mobile:flex-col-reverse justify-between h-max p-10 shadow md:shadow-lg border-${oppositeTheme} border-[1px]`}
    >
      {(isLoading || comics.length === 0) && <SlideComicSkeleton />}
      {isSuccess && currentComic && (
        <div className="flex flex-col px-10 w-max gap-5 mobile:w-fit mobile:mt-4">
          <h2
            className="font-bold desktop:text-4xl mobile:text-xl"
            title={currentComic.name}
          >
            <TextAnimation text={currentComic.name} />
          </h2>
          <h2
            className="line-clamp-4 mobile:text-sm"
            title={currentComic.briefDescription}
            dangerouslySetInnerHTML={{ __html: currentComic.briefDescription }}
          ></h2>
          <div className="flex gap-2 flex-wrap">
            {currentComic.genres.map((genre) => (
              <Link
                hrefLang="vi"
                href={`/tim-kiem?filterGenres=${genre.toLocaleLowerCase()}`}
                key={genre}
                className="capitalize"
                rel="preload"
              >
                <Chip label={genre} />
              </Link>
            ))}
          </div>
          <Button
            className="btn-primary w-fit"
            onClick={() => router.push(`/truyen/${currentComic.slug}`)}
          >
            {t("readNow", { ns: "common" })}
          </Button>
        </div>
      )}
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
            className="mobile:max-w-[300px] w-[500px]"
          >
            {comics.slice(0, THE_NUMBER_OF_COMICS_SLIDE).map((comic) => (
              <SwiperSlide key={comic.id + "-slide-comic"}>
                <div className="flex items-center justify-center">
                  <Image
                    priority
                    width={300}
                    height={400}
                    src={reduceQualityImage(comic.thumb)}
                    alt={comic.name}
                    className="w-[300px] max-h-[400px] object-cover mobile:w-[200px]"
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
