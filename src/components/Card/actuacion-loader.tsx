
import layout from '#@/styles/layout.module.css';

export default function FechaActuacionLoader () {


      return (
        <div
          className={layout.sectionRow}
        >
          <span> cargando </span>
          <div className={layout.loader}></div>;
        </div>
      );
}