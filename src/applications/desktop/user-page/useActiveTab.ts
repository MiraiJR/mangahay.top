import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabType } from "./enum";

export const useActiveTab = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(TabType.PROFILE);

  const updateActiveTab = () => {
    const tabHash = router.asPath.split("#")[1];
    const tabIndex = tabHash ? parseInt(tabHash) : TabType.PROFILE;
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    updateActiveTab();
  }, [router]);

  return {
    activeTab,
    setActiveTab,
  };
};
