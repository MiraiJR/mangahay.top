import { List, Modal } from "antd";
import { useReorderListChapterState } from "./useReorderListChapterState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const { listChapterForView, isLoading, handleReorder } =
    useReorderListChapterState(comicId);

  return (
    <Modal
      width="100vw"
      title="Sắp xếp thứ tự chương"
      open={visible}
      centered
      onOk={() => changeVisible(false)}
      onCancel={() => changeVisible(false)}
      loading={isLoading}
    >
      <DragDropContext onDragEnd={handleReorder}>
        <Droppable droppableId="chapterList">
          {(provided) => (
            <List
              size="large"
              bordered
              dataSource={listChapterForView}
              renderItem={(chapter) => (
                <Draggable
                  index={chapter.id}
                  draggableId={chapter.id.toString()}
                  key={chapter.id}
                >
                  {(provided) => (
                    <List.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {chapter.name}
                    </List.Item>
                  )}
                </Draggable>
              )}
              {...provided.droppableProps}
              ref={provided.innerRef}
            />
          )}
        </Droppable>
      </DragDropContext>
    </Modal>
  );
};
