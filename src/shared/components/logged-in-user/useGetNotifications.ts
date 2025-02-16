import { NOTIFICATION_STATUS } from "@/applications/desktop/user-page/components/notification/enum";
import MeService from "@/shared/services/meService";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface GetNotificationsParams {
  type: NOTIFICATION_STATUS;
}

export const DEFAULT_SIZE = 10;

export const useGetNotifications = ({ type }: GetNotificationsParams) => {
  const query = useInfiniteQuery({
    queryKey: ["notification", type],
    queryFn: async ({ pageParam }) => {
      const { data } = await MeService.getNotifications({
        page: pageParam,
        size: DEFAULT_SIZE,
        type,
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (!lastPage.hasNext) return undefined;

      return allPage.length + 1;
    },
    gcTime: 0,
  });

  const items: Notify[] = [];
  let total = 0;

  if (query.data) {
    query.data.pages.forEach((page) => {
      items.push(...page.data);
      total = page.total;
    });
  }

  const isLoading = query.isLoading || query.isFetchingNextPage;

  return {
    ...query,
    items,
    isLoading,
    total,
  };
};
