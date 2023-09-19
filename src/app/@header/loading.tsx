import { Loader } from 'components/Loader';
import layout from '#@/styles/layout.module.css';

export default function Loading() {
  return (
    <div className={layout.header}>
      <Loader />
    </div>
  );
}
