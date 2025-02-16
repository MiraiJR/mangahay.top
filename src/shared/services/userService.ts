import axiosClient from "../libs/axiosClient";

const UserService = {
  searchUser: (queryName: string, excludedIds: number[]) =>
    axiosClient.get<SearchUserResult>("/users/search", {
      params: {
        queryName,
        excludedIds,
      },
    }),
};

export default UserService;
