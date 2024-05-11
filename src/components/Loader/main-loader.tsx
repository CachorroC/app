import layout from '#@/styles/layout.module.css';
import modalStyles from '../Modal/styles.module.css';

export const TableLoader = () => {
  return (
    <td>
      <div className={layout.loader}></div>;
    </td>
  );
};

export function Loader() {
  return <div className={layout.loader}></div>;
}

export const ModalLoader = () => {
  return (
    <div className={modalStyles.open}>
      <div className={layout.loader}></div>
    </div>
  );
};
