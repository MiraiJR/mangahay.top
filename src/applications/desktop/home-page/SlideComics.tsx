import comicService from "@/shared/services/comicService";
import { useEffect, useState, useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import { toast } from "react-toastify";
import TextAnimation from "@/shared/components/animations/TextAnimation";

const SlideComics = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [currentComic, setCurrentComic] = useState<Comic | null>(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getRankingComics = async () => {
      try {
        const { data } = await comicService.getRankingComics("view", 5);
        setComics(data);
        if (data.length > 0) {
          setCurrentComic(data[0]);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getRankingComics();
  }, []);

  return (
    <div
      className={`bg-${themeStore.getOppositeTheme()} text-${theme} rounded-xl flex items-center mobile:flex-col-reverse justify-center h-max p-10`}
    >
      {currentComic && (
        <div className="flex flex-col px-10 w-max gap-5 mobile:w-fit mobile:mt-4">
          <h1
            className="font-bold desktop:text-4xl mobile:text-xl"
            title={currentComic.name}
          >
            <TextAnimation text={currentComic.name} />
          </h1>
          <h2
            className="line-clamp-4 mobile:text-sm"
            title={currentComic.briefDescription}
            dangerouslySetInnerHTML={{ __html: currentComic.briefDescription }}
          ></h2>
          <div className="flex gap-2 flex-wrap">
            {currentComic.genres.map((genre) => (
              <Link to={"/"} key={genre} className="capitalize">
                <Chip label={genre} />
              </Link>
            ))}
          </div>
          <div
            className="btn-primary w-fit"
            onClick={() => navigate(`/truyen/${currentComic.slug}`)}
          >
            Đọc ngay
          </div>
        </div>
      )}
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
          {comics.map((comic) => (
            <SwiperSlide key={comic.id}>
              <div className="flex items-center justify-center">
                <img
                  src={comic.thumb}
                  alt={comic.name}
                  className="w-[300px] max-h-[400px] object-cover mobile:w-[200px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideComics;
