import Head from "next/head";
import { CreativeWork } from "schema-dts";
import StructuredDataMarkup from "./StructuredDataMarkup";

interface itemProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export default function MetaTags({
  title,
  description,
  image,
  url,
}: itemProps) {
  const comic: CreativeWork = {
    "@type": "CreativeWork",
    name: title,
    description: description,
    genre: "Comic",
    publisher: {
      "@type": "Organization",
      name: "mangahay.top",
    },
    image,
    url,
  };
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="description" content={`${title} ${description}`} />
      <meta
        name="keywords"
        content={`${title.split(" ").join(",")},${description
          .split(" ")
          .join(",")}`}
      />
      <StructuredDataMarkup comic={comic} />
    </Head>
  );
}
