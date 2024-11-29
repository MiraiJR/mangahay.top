import { useState } from "react";

export const useAddNewRowPrivilege = () => {
  const [listNewPrivilege, setListNewPrivilege] = useState<
    Map<number, number[]>
  >(new Map());

  const addNewPrivilegeRow = () => {
    const map = new Map(listNewPrivilege);
    map.set(-listNewPrivilege.size - 1, []);
    setListNewPrivilege(map);
  };

  return {
    addNewPrivilegeRow,
  };
};
