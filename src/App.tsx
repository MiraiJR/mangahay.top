import MainLayout from "@/shared/components/main-layout/Page";
import { ToastContainer } from "react-toastify";
import { ThemProvider } from "./shared/contexts/ThemeContext";

function App() {
  return (
    <ThemProvider>
      <MainLayout>
        <ToastContainer position="bottom-right" autoClose={500} />
      </MainLayout>
    </ThemProvider>
  );
}

export default App;
