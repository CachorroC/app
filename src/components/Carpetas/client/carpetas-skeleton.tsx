import { Loader } from '#@/components/Loader/main-loader';
import styles from './carpetas-skeleton.module.css';

const SKELETON_ROWS = 8;
const SKELETON_COLUMNS = 12;

export function CarpetasSkeleton() {
  return (
    <div className={styles.skeleton}>
      {Array.from( {
        length: SKELETON_ROWS,
      } )
        .map( (
          _, rowIndex 
        ) => {
          return (
            <div
              key={rowIndex}
              className={styles.row}
            >
              {Array.from( {
                length: SKELETON_COLUMNS,
              } )
                .map( (
                  __, cellIndex 
                ) => {
                  return (
                    <div
                      key={cellIndex}
                      className={styles.cell}
                    >
                      <Loader />
                    </div>
                  );
                } )}
            </div>
          );
        } )}
    </div>
  );
}
