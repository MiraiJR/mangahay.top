import axiosClient from "../libs/axiosClient";

const UserService = {
  searchUser: (queryName: string) =>
    axiosClient.get<SearchUserResult>("/users/search", {
      params: {
        queryName,
      },
    }),
};

export default UserService;
