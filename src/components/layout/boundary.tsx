import { ReactNode } from 'react';

export const LabelBoundary = (
  {
    children, color
  }: { children: ReactNode; color:  'primary' | 'secondary' | 'tertiary' | 'error' }
) => {
  return (
    <div style={ {
      backgroundColor: `var(--${ color })`,
      color          : `var(--on-${ color })`
    }}>{
        children
      }</div>
  );
};
