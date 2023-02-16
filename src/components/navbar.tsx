import Link from 'next/link';
import navbar from '../styles/navbar.module.scss';
import { intLink } from '../types/link.interface';
import clientPromise from '../lib/mongodb';

export default function Navbar({
  links,
}: {
  links: intLink[];
}) {
  return (
    <nav className={navbar.main}>
      <ul className={navbar.grid}>
        {links.map((link: intLink) => (
          <Link
            key={link.name}
            href={link.url}
            className={navbar.link}>
            <li className={navbar.card}>
              <h2 className={navbar.linkname}>
                {link.name}
              </h2>
              <span className='material-symbols-outlined'>
                {link.icon}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const links = await db
      .collection('links')
      .find({})
      .limit(20)
      .toArray();

    // By returning { props: { posts } }, the Home component
    // will receive `posts` as a prop at build time
    return {
      props: {
        links: JSON.parse(JSON.stringify(links)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { links: JSON.parse(JSON.stringify(e)) },
    };
  }
}
