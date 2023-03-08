import { intButton } from '../types/card';
import styles from '../styles/css/button.module.css';
import Link from 'next/link';
import "material-symbols";

export default function Button(button: intButton) {
  return (
    <Link
      href={button.href}
      className={styles.button}
    >
      <span className="material-symbols-outlined">
        {button.icon}
      </span>
    </Link>
  );
}
