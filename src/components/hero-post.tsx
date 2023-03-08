import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import styles from "../styles/css/layout.module.css";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section className={styles.heroPost}>
      <CoverImage title={title} src={coverImage} slug={slug} />
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {title}
        </Link>
      </h3>
      <DateFormatter dateString={date} />
      <p>{excerpt}</p>
      <Avatar name={author.name} src={author.picture} />
    </section>
  );
};

export default HeroPost;
