/* import Image from "next/image";
import { Inter } from "@next/font/google";
import layout from "../styles/layout.module.scss";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    return { props: { isConnected: true } };
  } catch (e) {
    console.error(e);
    return { props: { isConnected: false } };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className={layout.description}>
        <p>
          Get started by editing&nbsp;
          <code className={layout.code}>
            {isConnected ? (
              <h2 className="subtitle">You are connected to MongoDB</h2>
            ) : (
              <h2 className="subtitle">
                You are NOT connected to MongoDB. Check the{" "}
                <code>README.md</code> for instructions.
              </h2>
            )}
          </code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={layout.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={layout.center}>
        <Image
          className={layout.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={layout.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={layout.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Docs <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Find in-depth information about Next.js features and&nbsp;API.
        </p>
      </a>

      <a
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={layout.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Learn <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Learn about Next.js in an interactive course with&nbsp;quizzes!
        </p>
      </a>

      <a
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={layout.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Templates <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Discover and deploy boilerplate example Next.js&nbsp;projects.
        </p>
      </a>

      <a
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={layout.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Deploy <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Instantly deploy your Next.js site to a shareable URL
          with&nbsp;Vercel.
        </p>
      </a>
    </>
  );
} */
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={ heroPost.excerpt }
            
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
