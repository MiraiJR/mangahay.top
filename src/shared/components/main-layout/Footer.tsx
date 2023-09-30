import LogoWeb from "@/shared/assets/logo.webp";
import { originalURL } from "@/shared/libs/config";
import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container mx-auto bg-slate-200 p-5">
      <div className=" flex desktop:items-center desktop:justify-around mobile:flex-col">
        <div className="flex flex-col items-center gap-5 font-medium text-lg">
          <Image
            priority
            width={0}
            height={150}
            className="h-[150px]"
            src={LogoWeb}
            alt="mangahay top"
          />
          <div className="flex gap-5">
            <Facebook size={30} />
            <Youtube size={30} />
          </div>
        </div>
        <div className="desktop:max-w-[50%]">
          <div className="font-bold text-lg mobile:text-sm">Từ khoá:</div>
          <ul className="flex flex-wrap gap-2">
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                truyện tranh
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                truyện tranh online
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                đọc truyện tranh
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                đọc truyện hay
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                manga world
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                nettruyen
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                nhattruyen
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                blogtruyen
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                truyentranhlh
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                otakusan
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                toptruyen
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                mi2manga
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                manhwa
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                manhua
              </Link>
            </li>
            <li className="desktop:btn-primary">
              <Link
                rel="preload"
                hrefLang="vi"
                href={originalURL ? originalURL : "https://mangahay.top"}
                className="mobile:text-sm capitalize"
              >
                manga
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-around mobile:flex-col mt-2">
        <div className="text-center">Bản quyền và thiết kể - MiraiJR</div>
        <div className="text-center">
          Liên hệ: mangahay.manga.noreply@gmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
