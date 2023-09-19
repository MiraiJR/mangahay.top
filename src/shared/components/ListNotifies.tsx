import themeStore from "../stores/themeStore";
import CardNotify from "./card/CardNotify";

interface itemProps {
  notifies: Notify[];
}

const ListNotifies = ({ notifies }: itemProps) => {
  return (
    <div
      className={`max-h-[500px] w-[100%] overflow-y-scroll p-4 bg-${themeStore.getTheme()}`}
    >
      {notifies.length === 0 ? (
        <div className="text-center">Không có thông báo</div>
      ) : (
        <div>
          {notifies.map((notify) => (
            <CardNotify notify={notify} key={notify.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListNotifies;
