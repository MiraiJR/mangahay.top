import { createContext, ReactNode, useContext, useState } from "react";
import { NEW_ROW_PRIVILEGE_ID_PREFIX } from "./constant";
import { generateUniqueString } from "@/shared/helpers/helpers";

interface PrivilegeContextProps {
  listNewRowPrivilege: string[];
  setListNewRowPrivilege: React.Dispatch<React.SetStateAction<string[]>>;
  addNewPrivilegeRow: () => void;
  removePrivilegeRow: (idNeedRemove: string) => void;
}

const PrivilegeContext = createContext<PrivilegeContextProps | null>(null);

export const PrivilegeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [listNewRowPrivilege, setListNewRowPrivilege] = useState<string[]>([]);

  const addNewPrivilegeRow = () => {
    setListNewRowPrivilege([...listNewRowPrivilege, generateUniqueString()]);
  };

  const removePrivilegeRow = (idNeedRemove: string) => {
    const targetElement = document.getElementById(
      `${NEW_ROW_PRIVILEGE_ID_PREFIX}${idNeedRemove}`
    );

    if (targetElement) {
      targetElement.remove();
    }
  };

  return (
    <PrivilegeContext.Provider
      value={{
        listNewRowPrivilege,
        setListNewRowPrivilege,
        addNewPrivilegeRow,
        removePrivilegeRow,
      }}
    >
      {children}
    </PrivilegeContext.Provider>
  );
};

export const usePrivilegeContext = () => {
  const context = useContext(PrivilegeContext);
  if (!context) {
    throw new Error(
      "PrivilegeContext must be used within PrivilegeContextProvider"
    );
  }
  return context;
};
