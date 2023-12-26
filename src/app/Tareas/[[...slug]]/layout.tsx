import { ReactNode } from 'react';
import layout from '#@/styles/layout.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';

export default function Layout(
  {
    params,
    children,
    right,
  }: {
    params: { slug?: string[] };
    children: ReactNode;
    right: ReactNode;
  } 
) {
      let title;

      if ( params.slug ) {
        const [
          ano,
          mes,
          dia 
        ] = params.slug;
        title = OutputDateHelper(
          new Date(
            Number(
              ano 
            ), Number(
              mes 
            ) - 1, Number(
              dia 
            ) 
          ),
        );
      } else {
        title = 'Tareas';
      }

      return (
        <>
          <div className={layout.top}>{title}</div>
          <div className={layout.left}>{children}</div>
          <div className={layout.right}>{right}</div>
        </>
      );
}
