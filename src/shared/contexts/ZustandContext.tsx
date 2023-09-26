import React, { useState } from "react";
import { globalStore } from "../stores/globalStore";
export const StoreContext = React.createContext<any>({});

export const ZustandProvider = ({ children }: any) => {
  const store = {
    globalStore,
  };
  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
};
