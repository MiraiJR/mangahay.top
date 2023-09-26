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

const LoginedUser = () => {
  const elementRef = useRef<any>(null);
  const notifyRef = useRef<any>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notifies, setNotifies] = useState<Notify[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showListNotifies, setShowListNotifies] = useState<boolean>(false);
  const { setIsLogined } = globalStore();
  const [theNumberOfUnredNotifies, setTheNumberOfUnredNotifies] =
    useState<number>(0);
  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await meService.getMe();

        setUser(data);
      } catch (error: any) {
        toast.error(error.mesage);
      }
    };

    const getNotifies = async () => {
      try {
        const { data } = await meService.getNotifies({
          page: 1,
          limit: 10,
        });
        setTheNumberOfUnredNotifies(
          data.reduce(
            (previousValue, curNotify) =>
              curNotify.isRead ? previousValue : previousValue + 1,
            0
          )
        );

        setNotifies(data);
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
            absolute top-[100%] right-0 flex items-center bg-${themeStore.getOppositeTheme()} w-[500px]`}
          >
            <ListNotifies notifies={notifies} />
          </div>
        )}
      </div>
      <div ref={elementRef}>
        {user && (
          <Image
            width={50}
            height={0}
            className="mobile:w-[40px] w-[50px] h-[50px] object-cover rounded"
            src={user.avatar}
            alt={user.fullname}
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
              {user && (
                <Link
                  rel="preload"
                  href="/me"
                  className="p-2 hover:bg-slate-400"
                  hrefLang="vi"
                >
                  Thông tin cá nhân
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  rel="preload"
                  href="/quan-ly"
                  className="p-2 hover:bg-slate-400"
                  hrefLang="vi"
                >
                  Đăng truyện
                </Link>
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
