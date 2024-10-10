import { useEffect, useRef, useState } from "react";

export const useClickOutside = () => {
  const [isVisiable, setIsVisiable] = useState<boolean>(false);

  const elementRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsVisiable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, setIsVisiable]);

  return {
    isVisiable,
    setIsVisiable,
    elementRef,
  };
};
