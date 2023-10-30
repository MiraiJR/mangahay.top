import { CreativeWork } from "schema-dts";

interface itemProps {
  comic: CreativeWork;
}

const StructuredDataMarkup = ({ comic }: itemProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(comic),
      }}
    ></script>
  );
};

export default StructuredDataMarkup;
