import { useEffect, useRef, useState } from "react";
import meService from "../services/meService";
import authService from "../services/authService";
import jwt from "../libs/jwt";
import { toast } from "react-toastify";
import { globalStore } from "../stores/globalStore";
import { Bell } from "lucide-react";
import { Badge } from "primereact/badge";
import ListNotifies from "./ListNotifies";
import themeStore from "../stores/themeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { reduceQualityImage } from "../helpers/helpers";
import MyLoading from "./MyLoading";
import { userStore } from "../stores/userStore";

const INTERVAL_REFRESH_NOTIFICATION: number = 5 * 60 * 1000;

const LoginedUser = () => {
  const { userProfile, setUserProfile } = userStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const elementRef = useRef<any>(null);
  const notifyRef = useRef<any>(null);
  const router = useRouter();
  const [notifies, setNotifies] = useState<Notify[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showListNotifies, setShowListNotifies] = useState<boolean>(false);
  const { setIsLogined } = globalStore();
  const [theNumberOfUnredNotifies, setTheNumberOfUnredNotifies] =
    useState<number>(0);

  const getNotifies = async (isToast: boolean = false) => {
    setIsLoading(true);

    try {
      const { data } = await meService.getNotifies({
        page: 1,
        limit: 10,
      });
      const newTheNumberOfUnreadNotifies = data.reduce(
        (previousValue, curNotify) =>
          curNotify.isRead ? previousValue : previousValue + 1,
        0
      );

      if (isToast && newTheNumberOfUnreadNotifies > theNumberOfUnredNotifies) {
        toast.success("Bạn có thông báo mới!");
      }

      setTheNumberOfUnredNotifies(newTheNumberOfUnreadNotifies);

      setNotifies(data);
      setIsLoading(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await meService.getMe();

        setUserProfile(data);
      } catch (error: any) {
        toast.error(error.mesage);
      }
    };

    getMe();
    getNotifies();

    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setShowListNotifies(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInterval(() => getNotifies(true), INTERVAL_REFRESH_NOTIFICATION);
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await authService.logout();

      jwt.deleteToken();
      setIsLogined(false);
      toast.success(data);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative cursor-pointer desktop:ml-10 flex gap-4">
      <div
        className="flex items-center justify-center gap-4 mobile:hidden"
        ref={notifyRef}
      >
        <div
          title="Thông báo"
          className={`p-2 rounded-full bg-${themeStore.getOppositeTheme()} relative`}
          onClick={() => setShowListNotifies(!showListNotifies)}
        >
          <Bell
            size={30}
            color={themeStore.getTheme() === "light" ? "white" : "black"}
          />
          <Badge
            value={theNumberOfUnredNotifies}
            className="absolute top-0 right-0 -translate-y-1/2"
          ></Badge>
        </div>
        {showListNotifies && (
          <div
            className={`rounded-sm z-10 shadow-outer-lg-${themeStore.getOppositeTheme()}
              absolute top-[100%] right-0 flex flex-col items-center bg-${themeStore.getOppositeTheme()} w-[500px]`}
          >
            {isLoading ? <MyLoading /> : <ListNotifies notifies={notifies} />}
            <div className="bg-blue-600 flex w-[100%] items-center justify-center py-4">
              <Link className={`text-${themeStore.getTheme()}`} href={"/me#1"}>
                Xem tất cả
              </Link>
            </div>
          </div>
        )}
      </div>
      <div ref={elementRef}>
        {userProfile && (
          <Image
            width={50}
            height={0}
            className="mobile:w-[40px] w-[50px] h-[50px] object-cover rounded"
            src={reduceQualityImage(userProfile.avatar)}
            alt={userProfile.fullname}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
        {showMenu && (
          <div
            style={{ zIndex: "9999" }}
            className={`rounded-sm p-4 shadow-outer-lg-${themeStore.getOppositeTheme()} absolute top-max right-0 flex items-center text-center bg-${themeStore.getTheme()} w-max`}
          >
            <ul className="flex flex-col">
              {userProfile && (
                <Link
                  rel="preload"
                  href="/me"
                  className="p-2 hover:bg-slate-400"
                  hrefLang="vi"
                >
                  Thông tin cá nhân
                </Link>
              )}
              {userProfile?.role === "admin" && (
                <div className="flex flex-col">
                  <Link
                    rel="preload"
                    href="/quan-ly#1"
                    className="p-2 hover:bg-slate-400"
                    hrefLang="vi"
                  >
                    Đăng truyện
                  </Link>
                  <Link
                    rel="preload"
                    href="/quan-ly#2"
                    className="p-2 hover:bg-slate-400"
                    hrefLang="vi"
                  >
                    Đăng chương mới
                  </Link>
                  <Link
                    rel="preload"
                    href="/quan-ly#3"
                    className="p-2 hover:bg-slate-400"
                    hrefLang="vi"
                  >
                    Crawl chương
                  </Link>
                </div>
              )}
              <li className="p-2 hover:bg-slate-400" onClick={handleLogout}>
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginedUser;
