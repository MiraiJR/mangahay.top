import { useTranslation } from "react-i18next";
import CardNotify from "../card/CardNotify";
import { useThemeContext } from "../../contexts/ThemeContext";

interface ListNotifiesProps {
  notifies: Notify[];
}

const ListNotifies = ({ notifies }: ListNotifiesProps) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  return (
    <div
      className={`max-h-[500px] w-[100%] overflow-y-scroll bg-${theme} no-scrollbar py-2`}
    >
      {notifies.length === 0 ? (
        <div className="text-center">
          {t("notification.noNotification", { ns: "common" })}
        </div>
      ) : (
        notifies.map((notify) => <CardNotify notify={notify} key={notify.id} />)
      )}
    </div>
  );
};

export default ListNotifies;
