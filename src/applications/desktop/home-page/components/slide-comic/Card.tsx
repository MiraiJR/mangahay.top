import TextAnimation from "@/shared/components/animations/TextAnimation";
import { Button, Tag } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chip } from "primereact/chip";
import { useTranslation } from "react-i18next";

interface CardProps {
  comic: Comic;
}

export const Card = ({ comic }: CardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col px-10 w-max gap-5 mobile:w-fit mobile:mt-4">
      <h2
        className="font-bold desktop:text-4xl mobile:text-sm"
        title={comic.name}
      >
        <TextAnimation text={comic.name} />
      </h2>
      <h2
        className="line-clamp-4 mobile:text-xs"
        title={comic.briefDescription}
        dangerouslySetInnerHTML={{ __html: comic.briefDescription }}
      ></h2>
      <div className="flex gap-2 flex-wrap">
        {comic.genres.map((genre) => (
          <Link
            href={`/tim-kiem?filterGenres=${genre.toLocaleLowerCase()}`}
            key={genre}
            className="capitalize"
            prefetch={false}
          >
            <Tag color="magenta">{genre}</Tag>
          </Link>
        ))}
      </div>
      <Button
        color="primary"
        variant="solid"
        className="w-fit"
        onClick={() => router.push(`/truyen/${comic.slug}`)}
      >
        {t("readNow", { ns: "common" })}
      </Button>
    </div>
  );
};
