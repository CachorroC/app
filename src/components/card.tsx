import { isTemplateExpression } from 'typescript';
import styles from '../styles/css/card.module.css';
import { intLink } from '../interfaces/link.interface';
import Link from 'next/link';
import Image from 'next/image';
import {
  intAvatar,
  intButton,
  intIndex,
  intList,
} from '../types/card';
import Avatar from './avatar';
import Button from './button';
import { Children } from 'react';

type Props = {
  title: string;
  _id?: string;
  index: intIndex;
  name: string;
  url: string;
  state: boolean;
  avatar: intAvatar;
  button: intButton;
  list: intList[];
  description?: string;
};
const Card = ({
  title,
  index,
  name,
  url,
  state,
  avatar,
  button,
  list,
  description,
}: Props) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.state}>
        <span className='material-symbols-outlined'>
          {state}
        </span>
      </div>
      <Avatar
        name={avatar.name}
        src={avatar.src}
      />
      <p className={styles.description}>{description}</p>
      <ul className={styles.list}>
        {list.map((item, index) => {
          return (
            <Link
              key={item.title}
              title={item.title}
              as={`/posts/${title}`}
              href='/posts/[title]'
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
