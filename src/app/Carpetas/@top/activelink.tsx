'use client';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

export default function ActiveLink<T extends string>(
  {
    href,
    category,
  }: {
    href: Route<T> | URL;
    category: string;
  } 
) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      key={category}
      href={`/Carpetas/Categorias/${ category }`}
      className={
        isActive
          ? styles.buttonCategoryActive
          : styles.buttonCategoryPasive
      }
    >
      {category}
    </Link>
  );
}
