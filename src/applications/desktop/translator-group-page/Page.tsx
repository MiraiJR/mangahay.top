import { UploadImageProvider } from "@/shared/components/base-components/upload-files/UploadImageContext";
import { TabTranslatorGroup } from "./components/tab-translator-group/TabTranslatorGroup";
import { TranslatorGroupDescription } from "./components/translator-group/TranslatorGroupDescription";
import { translatorGroup } from "./constant";
import { TranslatorGroupProvider } from "./contexts/TranslatorGroupContext";

const TranslatorGroupPage = () => {
  return (
    <TranslatorGroupProvider>
      <UploadImageProvider>
        <TranslatorGroupDescription translatorGroup={translatorGroup} />
      </UploadImageProvider>
      <TabTranslatorGroup />
    </TranslatorGroupProvider>
  );
};

export default TranslatorGroupPage;
