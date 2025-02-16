import { posts } from "../../constant";
import { Post } from "./Post";

interface NewsFeedProps {
  translatorGroupId: string;
}

export const NewsFeed = ({ translatorGroupId }: NewsFeedProps) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
