
import typography from '#@/styles/fonts/typography.module.css';

export default function NuevaNotallaveProceso(
  {
    params: {
      id
    },
  }: {
    params: { id: string };
  }
) {

      return <h1
        className={typography.displayLarge}
      >
        { `Nota numero: ${ id }` }
      </h1>;

}
