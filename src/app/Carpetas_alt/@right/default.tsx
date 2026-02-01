
import { sectionColumn } from '#@/styles/layout.module.css';
import { FilterControls, PaginationControls } from './PaginationControls';



export default function Default() {
  return (
    <>
      <section className={ sectionColumn }>

        <PaginationControls />
        <FilterControls />

      </section>

    </>
  );
}
