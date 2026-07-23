import estilosPagina from './pagina.module.css';
import styles from './esqueleto.module.css';

export default function CargandoTareas() {
  return (
    <div className={estilosPagina.pagina}>
      <div className={estilosPagina.encabezado}>
        <div>
          <h2 className={estilosPagina.titulo}>Tareas</h2>
          <p className={estilosPagina.subtitulo}>Pendientes internos y términos procesales por vencimiento</p>
        </div>
      </div>
      <div className={styles.grupo}>
        {Array.from( {
          length: 5 
        } )
          .map( (
            _, i 
          ) => {
            return <div key={i} className={styles.fila} />;
          } )}
      </div>
    </div>
  );
}
