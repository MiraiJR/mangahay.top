import LogoWeb from "@/shared/assets/logo.png";
import { originalURL } from "@/shared/libs/config";
import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className="container mx-auto bg-slate-200 p-5">
      <div className=" flex desktop:items-center desktop:justify-around mobile:flex-col">
        <div className="flex flex-col items-center gap-5 font-medium text-lg">
          <img className="h-[150px]" src={LogoWeb} alt="" />
          <div className="flex gap-5">
            <Facebook size={30} />
            <Youtube size={30} />
          </div>
        </div>
        <div className="desktop:max-w-[50%]">
          <div className="font-bold text-lg mobile:text-sm">Từ khoá:</div>
          <ul className="flex flex-wrap gap-2">
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                truyện tranh
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                truyện tranh online
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                đọc truyện tranh
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                đọc truyện hay
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                manga world
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                nettruyen
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                nhattruyen
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                blogtruyen
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                truyentranhlh
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                otakusan
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                toptruyen
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                mi2manga
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                manhwa
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                manhua
              </a>
            </li>
            <li className="desktop:btn-primary">
              <a
                hrefLang="vi"
                href={originalURL}
                className="mobile:text-sm capitalize"
              >
                manga
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-around mobile:flex-col mt-2">
        <div className="text-center">Bản quyền và thiết kể - MiraiJR</div>
        <div className="text-center">Liên hệ: truongvanhao159@gmail.com</div>
      </div>
    </div>
  );
};

export default Footer;
