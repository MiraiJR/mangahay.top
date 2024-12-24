import { Modal } from "antd";
import { useReorderListChapterState } from "./useReorderListChapterState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MyLoading from "@/shared/components/MyLoading";

interface ReorderListChapterProps {
  visible: boolean;
  changeVisible: Function;
  comicId: number;
}

export const ReorderListChapter = ({
  comicId,
  visible,
  changeVisible,
}: ReorderListChapterProps) => {
  const {
    listChapterForView,
    isLoading,
    handleReorder,
    handlePostReorderChapter,
  } = useReorderListChapterState(comicId, () => {
    changeVisible(false);
  });

  return (
    <Modal
      width="50vw"
      title="Sắp xếp thứ tự chương"
      open={visible}
      centered
      onOk={() => handlePostReorderChapter()}
      onCancel={() => changeVisible(false)}
      loading={isLoading}
    >
      {listChapterForView.length === 0 ? (
        <div className="text-center py-6">Không có chương</div>
      ) : (
        <DragDropContext onDragEnd={handleReorder}>
          <Droppable droppableId="listChapterForView">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {listChapterForView.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: "8px",
                          margin: "4px",
                          backgroundColor: "white",
                          border: "1px solid gray",
                        }}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Modal>
  );
};
