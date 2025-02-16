import { Body } from "./Body";
import { BreadCrumb } from "./BreadCrumb";
import { PageProvider } from "./Context";

const ChapterPage = () => {
  return (
    <PageProvider>
      <BreadCrumb />
      <Body />
    </PageProvider>
  );
};

export default ChapterPage;
