import clientPromise from '../lib/mongodb';
import { intLink } from '../types/link.interface';
import Link from 'next/link';
import styles from '../styles/css/card.module.css';
import Head from 'next/head';

// posts will be populated at build time by getStaticProps()
export default function Home({
  links,
}: {
  links: intLink[];
}) {
  return (
    <>
      <ul className={styles.links}>
        {links.map((link: intLink) => {
          return (
            <div
              className={styles.card}
              key={link.name}
            >
              <h2 className={styles.linkname}>
                {link.name}
              </h2>
              <Link
                href={link.url}
                className={styles.link}
              >
                <span className='material-symbols-outlined'>
                  {link.icon}
                </span>
              </Link>
            </div>
          );
        })}
      </ul>{' '}
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
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

    // By returning { props: { posts } }, the Home component/*  */
    // will receive `posts` as a prop at build time

    return {
      props: {
        isConnected: true,
        links: JSON.parse(JSON.stringify(links)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
