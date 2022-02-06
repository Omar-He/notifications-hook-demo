import { useEffect, useState } from "react";
import { getAllPokemon } from "@utils/requests";

const useNotifications = (
  pageNumber: number,
  refresh: boolean,
  lang?: string
) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Record<string, any>[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const getNotificationsData = async () => {
    const result = await getAllPokemon(10, pageNumber);
    if (!result) {
      return;
    }
    setTimeout(() => {
      setHasMore(result?.data?.notifications?.length !== 0);
      setNotifications((oldNotifications) => {
        return pageNumber > 1
          ? [...oldNotifications, ...result.results]
          : [...result.results];
      });
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    setLoading(true);
    getNotificationsData();
  }, [refresh]);
  return { loading, notifications, hasMore };
};

export default useNotifications;
