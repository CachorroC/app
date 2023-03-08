import Image from 'next/image';
import styles from '../styles/css/avatar.module.css';
import { intAvatar } from '../types/card';
export default function Avatar(avatar: intAvatar) {
  return (
    <div className={styles.flipcard}>
      <div className={styles.flipcardinner}>
        <div className={styles.flipcardfront}>
          <Image
            src={avatar.src}
            alt={avatar.name}
            height={300}
            width={300}
          />
        </div>
        <div className={styles.flipcardback}>
          <h1>{avatar.name}</h1>
        </div>
      </div>
    </div>
  );
}
