import { useTranslation } from "react-i18next";
import CardNotify from "../card/CardNotify";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface ListNotifiesProps {
  notifies: Notify[];
}

const ListNotifies = ({ notifies }: ListNotifiesProps) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`max-h-[500px] w-[100%] overflow-y-scroll pt-4 bg-${theme} no-scrollbar`}
    >
      {notifies.length === 0 ? (
        <div className="text-center">
          {t("noNotification", { ns: "common" })}
        </div>
      ) : (
        notifies.map((notify) => <CardNotify notify={notify} key={notify.id} />)
      )}
    </div>
  );
};

export default ListNotifies;
