import styles from '../styles/css/layout.module.css';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
export default function Header() {
  return (
    <div className={styles.header}>
      <span className='material-symbols-outlined'>home</span>
      <nav className={styles.navbar}>
        <Link href='/'>Home</Link>
        <Link href='/offline'>About</Link>
        <Link href='showLinks'>Show Links</Link>
        <Link href='blog'>Blog</Link>
        <Link href='/post/first'>First Post</Link>
        <Link href='/post/second'>Second Post</Link>
        <Link href='/showLinks'>links</Link>
      </nav>
      <Drawer />
    </div>
  );
}
