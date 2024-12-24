import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { useLayoutManagerData } from "./useLayoutManagerData";
import CreateComicForm from "../../CreateComicForm";
import CreateChapterForm from "../../CreateChapterForm";
import CrawlChapter from "../../CrawlChapter";
import { TableComicsManagedByMe } from "../comic-manged-by-me/TableComicManagedByMe";
import { useLogout } from "@/shared/components/logged-in-user/useLogout";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

export const LayoutManager = () => {
  const { isAdminOrTranslator } = useAuthContext();
  const { t } = useTranslation();
  const { sideBarItems, indexActiveTab } = useLayoutManagerData();
  const { handleLogout } = useLogout();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  if (!isAdminOrTranslator) {
    router.push("/");
  }

  const renderActiveTab = () => {
    switch (indexActiveTab) {
      case 1:
        return <TableComicsManagedByMe />;
      case 2:
        return <CreateComicForm />;
      case 3:
        return <CreateChapterForm />;
      case 4:
        return <CrawlChapter />;
      default:
        break;
    }
  };

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={"250px"}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sideBarItems}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 250 }}>
        <Header
          style={{
            padding: "10px",
            background: colorBgContainer,
            width: "100%",
          }}
          className="flex justify-end items-center"
        >
          <Button
            color="danger"
            variant="outlined"
            onClick={() => handleLogout()}
          >
            {t("profile.features.logout", { ns: "common" })}
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderActiveTab()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MangaHay ©{new Date().getFullYear()} Created by MiraiJR
        </Footer>
      </Layout>
    </Layout>
  );
};
