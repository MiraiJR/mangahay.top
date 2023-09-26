import LogoWeb from "@/shared/assets/logo.png";
import LogoWebLight from "@/shared/assets/logo-light.png";
import {
  ChevronDown,
  History,
  Library,
  LucideIcon,
  Search,
  UserCircle2,
} from "lucide-react";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState, useContext } from "react";
import ListSearchingComics from "./ListSearchingComics";
import comicService from "@/shared/services/comicService";
import jwt from "@/shared/libs/jwt";
import LoginedUser from "../LoginedUser";
import { globalStore } from "@/shared/stores/globalStore";
import ListGenres from "../ListGenres";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import themeStore from "@/shared/stores/themeStore";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Item = {
  id: number;
  label: string;
  isChevronDown: boolean;
  handle: any;
  Icon?: LucideIcon;
};

const Header = () => {
  const inputRef = useRef<any>(null);
  const genreRef = useRef<any>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isShowReponseComics, setIsShowReponseComics] =
    useState<boolean>(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const { isLogined, setIsLogined } = globalStore();
  const [showListGenres, setShowListGenres] = useState<boolean>(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checkedChangeTheme, setCheckedChangeTheme] = useState<boolean>(
    themeStore.getTheme() === "light" ? false : true
  );
  const router = useRouter();

  const leftMenu: Item[] = [
    {
      id: 1,
      label: "Thể loại",
      isChevronDown: true,
      handle: () => {
        setShowListGenres(!showListGenres);
      },
      Icon: Library,
    },
    {
      id: 2,
      label: "Xếp hạng",
      isChevronDown: false,
      handle: () => {},
    },
    {
      id: 3,
      label: "Lịch sử",
      isChevronDown: false,
      handle: () => {
        router.push("/lich-su");
      },
      Icon: History,
    },
  ];

  const handleSearchComic = async (comicName: string) => {
    if (comicName.trim() === "") {
      setComics([]);
      setIsShowReponseComics(false);
      return;
    }

    try {
      const { data } = await comicService.searchComics({
        comicName,
        page: 1,
        limit: 10,
      });

      setComics(data.comics);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (jwt.getToken()) {
      setIsLogined(true);
    }

    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsShowReponseComics(false);
      }

      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setShowListGenres(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [theme]);

  return (
    <div
      className={`container mx-auto bg-${theme} text-${themeStore.getOppositeTheme()} p-5 flex justify-between items-center relative`}
    >
      <div className="flex items-center gap-5 font-medium text-lg">
        <Link href="/" hrefLang="vi">
          <Image
            width={0}
            height={100}
            className="mobile:h-[50px] mobile:w-fit h-[100px]"
            src={theme === "light" ? LogoWeb : LogoWebLight}
            alt="mangahay.top logo"
          />
        </Link>
        <div ref={genreRef}>
          <div className="flex gap-4 mobile:gap-1">
            {leftMenu.map((item: Item) => (
              <div
                className="flex items-center cursor-pointer"
                key={item.id}
                onClick={item.handle}
              >
                <span className="mobile:hidden">{item.label}</span>
                {item.Icon && (
                  <item.Icon size={30} className="desktop:hidden" />
                )}
                {item.isChevronDown && (
                  <ChevronDown size={15} className="mobile:hidden" />
                )}
              </div>
            ))}
          </div>
          {showListGenres && (
            <div className="absolute z-50 top-full w-max desktop:top-3/4 mobile:left-0">
              <ListGenres />
            </div>
          )}
        </div>
      </div>
      <div className="card flex flex-wrap items-center justify-content-center gap-3">
        <div className="flex items-center gap-2 mobile:hidden">
          <h3>{theme === "light" ? "Sáng" : "Tối"}</h3>
          <InputSwitch
            checked={checkedChangeTheme}
            onChange={(e: InputSwitchChangeEvent) => {
              toggleTheme();
              setCheckedChangeTheme(e.value ?? true);
            }}
          />
        </div>
        <div className="mobile:hidden">
          <div className="p-input-icon-left relative" ref={inputRef}>
            <i
              className="pi pi-search cursor-pointer"
              onClick={() => router.push("/tim-kiem")}
            />
            <InputText
              className="w-[300px]"
              placeholder="Tìm kiếm truyện"
              value={inputSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearchComic(e.target.value);
                setInputSearch(e.target.value);
                setIsShowReponseComics(true);
              }}
              onFocus={() => setIsShowReponseComics(true)}
            />
            {isShowReponseComics && <ListSearchingComics comics={comics} />}
          </div>
        </div>
        <Link
          href="/tim-kiem"
          hrefLang="vi"
          className="desktop:hidden p-2 bg-black rounded"
        >
          <Search className="" color="white" size={20} />
        </Link>
        {isLogined ? (
          <LoginedUser />
        ) : (
          <Link href="/dang-nhap" hrefLang="vi">
            <button
              className={`desktop:rounded-full mobile:rounded mobile:p-2 py-2 px-4 font-bold bg-${themeStore.getOppositeTheme()} text-${theme}`}
            >
              <UserCircle2 size={20} className="desktop:hidden" />
              <span className="mobile:hidden">Đăng nhập</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
