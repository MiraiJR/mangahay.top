import axiosClient from "../libs/axiosClient";

export const TypeComicInteraction = {
  like: "like",
  unlike: "unlike",
  follow: "follow",
  unfollow: "unfollow",
};

export default {
  getMe: () => axiosClient.get<User>("/users/me"),
  getInteractionWithComic: (comicId: number) =>
    axiosClient.get<StatusInteractWithComic>(
      `/users/me/check-interaction/${comicId}`
    ),
  interactWithComic: (comicId: number, action: string) =>
    axiosClient.put<StatusInteractWithComic>(
      `/users/me/interact/${comicId}?action=${action}`
    ),
  getNotifies: (paging: Paging) =>
    axiosClient.get<Notify[]>(`/users/me/notifies`, {
      params: paging,
    }),
};
