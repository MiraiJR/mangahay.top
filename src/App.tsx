import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/shared/components/main-layout/Page";
import HomePage from "./applications/desktop/home-page/Page";
import ComicPage from "./applications/desktop/comic-page/Page";
import LoginPage from "./applications/desktop/auth-page/login/Page";
import { ToastContainer } from "react-toastify";
import ChapterPage from "./applications/desktop/chapter-page/Page";
import RegisterPage from "./applications/desktop/auth-page/register/Page";
import SearchPage from "./applications/desktop/search-page/Page";
import HistoryPage from "./applications/desktop/history-page/Page";
import ManagerPage from "./applications/desktop/manager-page/Page";
import { ThemProvider } from "./shared/contexts/ThemeContext";

function App() {
  return (
    <ThemProvider>
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route path="/dang-ky" element={<RegisterPage />} />
            <Route path="/tim-kiem" element={<SearchPage />} />
            <Route path="/lich-su" element={<HistoryPage />} />
            <Route path="/quan-ly" element={<ManagerPage />} />
            <Route path="/truyen/:slugComic" element={<ComicPage />} />
            <Route
              path="/truyen/:slugComic/:slugChapter"
              element={<ChapterPage />}
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={500} />
      </MainLayout>
    </ThemProvider>
  );
}

export default App;
