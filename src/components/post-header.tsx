import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";

import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <Avatar name={author.name} src={author.picture} />
      <CoverImage title={title} src={coverImage} />
      <Avatar name={author.name} src={author.picture} />
      <DateFormatter dateString={date} />
    </>
  );
};

export default PostHeader;
