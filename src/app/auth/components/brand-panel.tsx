import Image from 'next/image';
import styles from './brand-panel.module.css';

export const BrandPanel = () => {
  return (
    <>
      <div className={styles.header}>
        <Image
          src="/icon.png"
          alt="R&S Asesoría Jurídica"
          width={40}
          height={40}
          className={styles.logo}
        />
        <div className={styles.wordmark}>R&S Asesoría Jurídica</div>
      </div>

      <div className={styles.copy}>
        <div className={styles.headline}>Recuperamos su cartera, con orden y transparencia.</div>
        <div className={styles.subline}>Plataforma interna de gestión de carpetas, actuaciones y cobros de la firma.</div>
      </div>

      <div className={styles.footer}>
        <span className={`material-symbols-rounded ${ styles.footerIcon }`} aria-hidden="true">lock</span>
        Conexión cifrada · uso exclusivo del equipo autorizado
      </div>

      <Image
        src="/icon.png"
        alt=""
        aria-hidden="true"
        width={340}
        height={340}
        className={styles.emblem}
      />
    </>
  );
};
