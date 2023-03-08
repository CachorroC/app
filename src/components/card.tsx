import { isTemplateExpression } from 'typescript';
import styles from '../styles/css/card.module.css';
import { intLink } from '../interfaces/link.interface';
import Link from 'next/link';
import Image from 'next/image';
import {
  intAvatar,
  intButton,
  intCard,
  intList,
} from '../types/card';
import Avatar from './avatar';
import Button from './button';

export default function Card({
  card,
  avatar,
  button,
  list,
}: {
  card: intCard;
  avatar: intAvatar;
  button: intButton;
  list: intList;
}) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{card.title}</h1>
      <div className={styles.state}>
        <span className='material-symbols-outlined'>
          {card.state}
        </span>
      </div>
      <Avatar
        name={avatar.name}
        src={avatar.src}
      ></Avatar>
      <Button
        text={''}
        icon={''}
        href={''}
      />
      <div className={styles.btn2}></div>
      <div className={styles.btn1}></div>
      <div className={styles.description}></div>
      <div className={styles.list}></div>
    </div>
  );
}
