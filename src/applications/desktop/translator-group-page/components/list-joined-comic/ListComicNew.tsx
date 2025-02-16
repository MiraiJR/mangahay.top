import { Button, Card, Divider, Pagination } from "antd";
import { useTranslatorGroupContext } from "../../contexts/TranslatorGroupContext";
import { useRouter } from "next/router";

interface ListComicNewProps {
  comics: Comic[];
  title: string;
}

export const ListComicNew = ({ comics, title }: ListComicNewProps) => {
  const router = useRouter();
  const { translatorGroup } = useTranslatorGroupContext();
  return (
    <div className="border border-black p-5 rounded-sm my-5">
      <div className="flex flex-row justify-between items-center">
        <h1>{title}</h1>
        <Button
          type="link"
          onClick={() =>
            router.push(
              `/tim-kiem?filterAuthor=${translatorGroup.name}&filterState=${title}`
            )
          }
        >
          More
        </Button>
      </div>
      <Divider className="bg-black" />
      <div className="grid grid-cols-6 gap-2 mobile:grid-cols-3">
        {comics.map((comic) => {
          return (
            <Card
              key={comic.id}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={comic.thumb} />}
            >
              <h2>{comic.name}</h2>
            </Card>
          );
        })}
      </div>
      <Pagination align="end" />
    </div>
  );
};
