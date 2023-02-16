/** @format */
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Link
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <Image
          width={240}
          height={240}
          src="/vercel.svg"
          alt="Vercel Logo"
          className="logo"
        />
      </Link>
    </footer>
  );
}
