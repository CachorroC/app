import { useRouter } from "next/router";
import styles from "../../../styles/css/layout.module.css";

export default function CommentPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const comment = router.query.comment as string;

  return (
    <main className={styles.main}>
      <ul className={styles.grid}>
        <li className={styles.card}>
          <h1>Post: {id}</h1>
          <h1>Comment: {comment}</h1>
        </li>
      </ul>
    </main>
  );
}
