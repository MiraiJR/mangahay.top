import MyLoading from "@/shared/components/MyLoading";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { userStore } from "@/shared/stores/user-storage";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import { Pen } from "lucide-react";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { usePrivilegeTable } from "./usePrivilegeTable";
import { PencilOff } from "../../../../../shared/icons/PencilOff";
import { SquarePlus } from "@/shared/icons/SquarePlus";
import { EditableRowPrivilege } from "./EditableRowPrivilege";
import { usePrivilegeContext } from "./PrivilegeContext";

interface PrivilegeTableProps {
  comicId: number;
}

export const PrivilegeTable = ({ comicId }: PrivilegeTableProps) => {
  const { theme, oppositeTheme } = useThemeContext();
  const { userProfile } = userStore();
  const {
    privileges,
    isLoading,
    handleChangeUserRight,
    checkPermission,
    resetEdit,
  } = usePrivilegeTable(comicId);
  const { addNewPrivilegeRow, listNewRowPrivilege } = usePrivilegeContext();
  if (isLoading) {
    return <MyLoading />;
  }

  return (
    <>
      <div className="flex gap-2">
        <Button className="w-fit p-1 my-2" onClick={addNewPrivilegeRow}>
          <SquarePlus />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table
          className={`table-auto w-full border-collapse border border-${theme} text-${oppositeTheme}`}
        >
          <thead>
            <tr className="bg-gray-100">
              <th
                className={`border border-${oppositeTheme} bg-${theme} px-4 py-2 text-left`}
              >
                User
              </th>
              <th
                className={`border border-${oppositeTheme} bg-${theme} px-4 py-2 text-left`}
              >
                Update Chapter
              </th>
              <th
                className={`border border-${oppositeTheme} bg-${theme} px-4 py-2 text-left`}
              >
                Update Comic
              </th>
              <th
                className={`border border-${oppositeTheme} bg-${theme} px-4 py-2 text-left`}
              >
                Remove Chapter
              </th>
              <th
                className={`border border-${oppositeTheme} bg-${theme} px-4 py-2 text-left`}
              >
                Remove Comic
              </th>
            </tr>
          </thead>
          <tbody>
            {listNewRowPrivilege.map((newRowId) => (
              <EditableRowPrivilege comicId={comicId} id={newRowId} />
            ))}
            {privileges.map((privilege) => (
              <tr key={privilege.id}>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    privilege.user.id === userProfile?.id ? "text-red-400" : ""
                  }`}
                >
                  {privilege.user.fullname}
                </td>
                {Object.entries(ComicPrivilegePermission)
                  .filter(([privilegeLabel, privilegeValue]) =>
                    isNaN(Number(privilegeLabel))
                  )
                  .map(([privilegeLabel, privilegeValue]) => (
                    <td
                      key={privilege.id}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      <Checkbox
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={checkPermission(
                          privilege.user.id,
                          privilegeValue as ComicPrivilegePermission
                        )}
                        onChange={(event: CheckboxChangeEvent) => {
                          handleChangeUserRight(
                            event.checked ?? false,
                            privilegeValue as ComicPrivilegePermission,
                            privilege.user.id
                          );
                        }}
                      />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* {isEditable && (
          <Button className="mt-2" onClick={() => {}}>
            Submit
          </Button>
        )} */}
      </div>
    </>
  );
};
