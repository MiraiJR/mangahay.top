import { useEffect, RefObject, useRef } from "react";

export const useClickOutside = (
  targetFunction: (isOutside: boolean) => void
) => {
  const elementRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        targetFunction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, targetFunction]);

  return {
    elementRef,
  };
};
