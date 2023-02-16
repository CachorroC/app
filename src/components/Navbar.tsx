import Link from 'next/link';
import navbar from '../styles/navbar.module.scss';

export default function Header() {
  return (
    <nav className={navbar.main}>
      <Link
        href='/'
        className={navbar.link}>
        Home
      </Link>

      <Link
        href='/offline'
        className={navbar.link}>
        About
      </Link>

      <Link
        href='/post/first'
        className={navbar.link}>
        First Post
      </Link>

      <Link
        href='/post/second'
        className={navbar.link}>
        Second Post
      </Link>
      <Link
        href='/showLinks'
        className={navbar.link}>
        links
      </Link>
    </nav>
  );
}
