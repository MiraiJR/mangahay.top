import { useSearchUserByName } from "@/shared/hooks/useSearchUserByName";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { usePrivilegeContext } from "./PrivilegeContext";
import { NEW_ROW_PRIVILEGE_ID_PREFIX } from "./constant";
import { useSubmitSingleUserRight } from "./useSubmitSingpleUserRight";

interface EditableRowPrivilegeProps {
  comicId: number;
  id: string;
}

export const EditableRowPrivilege = ({
  comicId,
  id,
}: EditableRowPrivilegeProps) => {
  const { handleSearchUser } = useSearchUserByName();
  const { removePrivilegeRow } = usePrivilegeContext();
  const {
    updateSingleUserRight,
    isLoadingUpdateSingleUserRight,
    isSuccessUpdateSingleUserRight,
    selectedUser,
    setSelectedUser,
    recommendedUsers,
    setRecommendedUsers,
    canUpdateChapter,
    setCanUpdateChapter,
    canUpdateComic,
    setCanUpdateComic,
    canRemoveChapter,
    setCanRemoveChapter,
    canRemoveComic,
    setCanRemoveComic,
  } = useSubmitSingleUserRight(comicId);

  useEffect(() => {
    if (isSuccessUpdateSingleUserRight) {
      removePrivilegeRow(id);
    }
  }, [isSuccessUpdateSingleUserRight]);

  return (
    <tr id={`${NEW_ROW_PRIVILEGE_ID_PREFIX}${id}`}>
      <td className="border border-gray-300 px-4 py-2">
        <AutoComplete
          value={selectedUser}
          completeMethod={async (event) => {
            const users = await handleSearchUser(event.query);
            setRecommendedUsers(
              users?.map((user) => `${user.id}/${user.fullname}`) ?? []
            );
          }}
          suggestions={recommendedUsers}
          onChange={(e) => {
            setSelectedUser(e.value);
          }}
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Checkbox
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={canUpdateChapter}
          onChange={(event) => {
            setCanUpdateChapter(event.checked ?? false);
          }}
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Checkbox
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={canUpdateComic}
          onChange={(event) => {
            setCanUpdateComic(event.checked ?? false);
          }}
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Checkbox
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={canRemoveChapter}
          onChange={(event) => {
            setCanRemoveChapter(event.checked ?? false);
          }}
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Checkbox
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={canRemoveComic}
          onChange={(event) => {
            setCanRemoveComic(event.checked ?? false);
          }}
        />
      </td>
      <div className="flex flex-col justify-center items-center gap-2">
        <button
          className="bg-green-400 rounded-sm ml-2"
          onClick={() => {
            updateSingleUserRight();
          }}
          disabled={isLoadingUpdateSingleUserRight}
        >
          <Check size={25} />
        </button>
        <button
          className="bg-red-400 rounded-sm ml-2"
          onClick={() => removePrivilegeRow(id)}
        >
          <X size={25} />
        </button>
      </div>
    </tr>
  );
};
