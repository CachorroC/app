import estilosPagina from './pagina.module.css';
import styles from './esqueleto.module.css';

export default function CargandoNotas() {
  return (
    <div className={estilosPagina.pagina}>
      <div className={estilosPagina.encabezado}>
        <div>
          <h2 className={estilosPagina.titulo}>Notas</h2>
          <p className={estilosPagina.subtitulo}>Apuntes y listas de verificación del despacho</p>
        </div>
      </div>
      <div className={estilosPagina.grid}>
        {Array.from( {
          length: 6 
        } )
          .map( (
            _, i 
          ) => {
            return <div key={i} className={styles.tarjeta} />;
          } )}
      </div>
    </div>
  );
}
