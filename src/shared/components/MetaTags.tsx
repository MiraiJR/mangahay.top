import Head from "next/head";

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
      <script type="application/ld+json">
        {`"@context": "${url}",
      "@type": "Review",
      "name": "${title}",
      "description": "${description}"
      `}
      </script>
    </Head>
  );
}
