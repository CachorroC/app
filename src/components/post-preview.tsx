import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <>
      <CoverImage slug={slug} title={title} src={coverImage} />

      <h3>
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div>
        <DateFormatter dateString={date} />
      </div>
      <p>{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </>
  );
};

export default PostPreview;
