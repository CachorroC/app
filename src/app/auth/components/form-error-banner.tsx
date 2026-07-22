import styles from './form-error-banner.module.css';

export const FormErrorBanner = ( {
  message 
}: { message: string } ) => {
  return (
    <div className={styles.banner} role="alert">
      <span className={`material-symbols-rounded ${ styles.icon }`} aria-hidden="true">error</span>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
