import axiosClient from "../libs/axiosClient";

export const TypeComicInteraction = {
  like: "like",
  unlike: "unlike",
  follow: "follow",
  unfollow: "unfollow",
};

const MeService = {
  getMe: () => axiosClient.get<User>("/users/me"),
  getInteractionWithComic: (comicId: number) =>
    axiosClient.get<StatusInteractWithComic>(
      `/users/me/check-interaction/${comicId}`
    ),
  interactWithComic: (comicId: number, action: string) =>
    axiosClient.put<StatusInteractWithComic>(
      `/users/me/interact/${comicId}?action=${action}`
    ),
  getNotifies: (paging: Paging | null) =>
    axiosClient.get<Notify[]>(`/users/me/notifies`, {
      params: paging,
    }),
  getFollowingComics: () =>
    axiosClient.get<Comic[]>(`/users/me/comics/following`),
  updateAvatar: (formData: FormData) =>
    axiosClient.put<User>(`/users/me/profile/avatar`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  updateProfile: ({ fullname, phone }: { fullname?: string; phone?: string }) =>
    axiosClient.patch<User>(`/users/me/profile`, {
      fullname,
      phone,
    }),
};

export default MeService;
