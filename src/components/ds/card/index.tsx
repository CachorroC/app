import { HTMLAttributes, ReactNode } from 'react';
import styles from './card.module.css';

type CardVariant = 'elevated' | 'filled' | 'outlined';

export type CardProps = {
  children    : ReactNode;
  variant?    : CardVariant;
  interactive?: boolean;
  padding?    : number | string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Card = ( {
  children,
  variant = 'elevated',
  interactive = false,
  padding = 20,
  className,
  style,
  ...rest
}: CardProps ) => {
  const classes = [
    styles.root,
    styles[ variant ],
    interactive && styles.interactive,
    className,
  ].filter( Boolean )
    .join( ' ' );

  return (
    <div className={classes} style={{
      padding,
      ...style 
    }} {...rest}
    >
      {children}
    </div>
  );
};
