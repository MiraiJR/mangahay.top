import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnswerCommentEditorContextProps {
  activeEditorId: number | null;
  setActiveEditorId: (id: number | null) => void;
}

const AnswerCommentEditorContext = createContext<
  AnswerCommentEditorContextProps | undefined
>(undefined);

export const AnswerCommentEditorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeEditorId, setActiveEditorId] = useState<number | null>(null);

  return (
    <AnswerCommentEditorContext.Provider
      value={{ activeEditorId, setActiveEditorId }}
    >
      {children}
    </AnswerCommentEditorContext.Provider>
  );
};

export const useAnswerCommentContext = () => {
  const context = useContext(AnswerCommentEditorContext);
  if (!context) {
    throw new Error(
      "useAnswerCommentContext must be used within an AnswerCommentEditorProvider"
    );
  }
  return context;
};
