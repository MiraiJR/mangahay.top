import { useState } from "react";
import { toast } from "react-toastify";
import UserService from "../services/userService";

export const useSearchUserByName = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (queryName: string, excludedIds?: number[]) => {
    setIsLoading(true);

    try {
      const { data } = await UserService.searchUser(
        queryName,
        excludedIds ?? []
      );

      return data.users;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSearchUser: handleSearch,
  };
};
