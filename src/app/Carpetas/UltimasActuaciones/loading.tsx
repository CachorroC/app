import { SearchOutputListSkeleton } from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import layout from '#@/styles/layout.module.css';

export default function Loading() {
      return (
        <div className={layout.left}>
          <SearchOutputListSkeleton />
        </div>
      );
}
