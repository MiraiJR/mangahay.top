import { Camera } from "lucide-react";
import { ReactElement } from "react";

interface ChangedImageWithHoverProps {
  children: ReactElement;
  onClickOnIcon: () => void;
  active?: boolean;
  className?: string;
}

export const ChangedImageWithHover = ({
  children,
  onClickOnIcon,
  className,
  active = false,
}: ChangedImageWithHoverProps) => {
  return (
    <div className={`relative group ${className}`}>
      {children}
      {active && (
        <div
          className="absolute bg-[rgba(0,0,0,0.5)] top-0 z-2 w-full h-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onClickOnIcon}
          aria-label="Change avatar"
        >
          <Camera size={30} color="white" />
        </div>
      )}
    </div>
  );
};
