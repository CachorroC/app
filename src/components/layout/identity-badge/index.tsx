import { getCurrentLawyer } from '#@/lib/auth/session';
import { signOut } from '#@/app/auth/actions';
import styles from './identity-badge.module.css';

export const IdentityBadge = async () => {
  const lawyer = await getCurrentLawyer();

  if ( !lawyer ) {
    return <a href="/auth" className={styles.signInLink}>Iniciar sesión</a>;
  }

  return (
    <div className={styles.wrap}>
      {lawyer.avatarUrl
        ? <img src={lawyer.avatarUrl} alt="" width={24} height={24} className={styles.avatar} />
        : <span className={styles.avatar} aria-hidden="true" />}
      <span className={styles.nombre}>{lawyer.nombre}</span>
      <form action={signOut}>
        <button type="submit" className={styles.signOutBtn}>Salir</button>
      </form>
    </div>
  );
};
