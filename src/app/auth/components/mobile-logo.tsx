import Image from 'next/image';
import styles from './mobile-logo.module.css';

export const MobileLogo = () => {
  return (
    <div className={styles.wrap}>
      <Image
        src="/icon.png"
        alt="R&S Asesoría Jurídica"
        width={34}
        height={34}
        className={styles.logo}
      />
      <div className={styles.wordmark}>R&S Asesoría Jurídica</div>
    </div>
  );
};
