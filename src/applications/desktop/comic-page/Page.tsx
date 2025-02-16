import { PageProvider } from "./Context";
import { BreadCrumb } from "./BreadCrumb";
import { Body } from "./Body";

const ComicPage = () => {
  return (
    <PageProvider>
      <div>
        <BreadCrumb />
        <Body />
      </div>
    </PageProvider>
  );
};

export default ComicPage;
