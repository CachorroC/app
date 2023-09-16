import { NewNota } from 'components/Nota/client';
import layout from '#@/styles/layout.module.css';

export default function NuevaNota(
  {
    params,
  }: {
  params: { llaveProceso: string };
} 
) {
  return (
    <NewNota key={params.llaveProceso} llaveProceso={params.llaveProceso} />
  );
}
