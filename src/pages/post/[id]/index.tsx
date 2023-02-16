import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.scss';

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <main className={styles.main}>
      <h1>Post: {id}</h1>
      <ul className={styles.grid}>
        <Link
          href={`/post/${id}/first-comment`}
          className={styles.card}>
          First comment
        </Link>

        <Link
          href={`/post/${id}/second-comment`}
          className={styles.card}>
          Second comment
        </Link>
        <Link
          href={`/post/${id}/third-comment`}
          className={styles.card}>
          third comment
        </Link>
        <Link
          href={`/post/${id}/fourth-comment`}
          className={styles.card}>
          fourth comment
        </Link>
        <Link
          href={`/post/${id}/fifth-comment`}
          className={styles.card}>
          fifth comment
        </Link>
        <Link
          href={`/post/${id}/sixth-comment`}
          className={styles.card}>
          sixth comment
        </Link>
        <Link
          href={`/post/${id}/seventh-comment`}
          className={styles.card}>
          seventh comment
        </Link>
        <Link
          href={`/post/${id}/eight-comment`}
          className={styles.card}>
          eight comment
        </Link>
        <Link
          href={`/post/${id}/nineth-comment`}
          className={styles.card}>
          nineth comment
        </Link>
      </ul>
    </main>
  );
}
