import { card } from '#@/styles/proto-styles.module.css';
import { CSSProperties, ReactNode } from 'react';

export function Card( {
  children,
  style,
}: {
  children: ReactNode;
  style?  : CSSProperties;
} ) {
  return (
    <section
      className={card}
      style={style}
    >
      {children}
    </section>
  );
}
