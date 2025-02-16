import LogoWeb from "@/shared/assets/logo.webp";
import LogoWebLight from "@/shared/assets/logo-light.webp";
import Image from "next/image";
import Link from "next/link";
import { useThemeContext } from "@/shared/contexts/ThemeContext";

interface MainLogoProps {
  size?: number;
}

export const MainLogo = ({ size = 30 }: MainLogoProps) => {
  const { theme } = useThemeContext();

  return (
    <Link href="/" hrefLang="vi">
      <Image
        priority
        width={100}
        className={`mobile:w-[${size}px]`}
        src={theme === "light" ? LogoWeb : LogoWebLight}
        alt="mangahay.top logo"
      />
    </Link>
  );
};
