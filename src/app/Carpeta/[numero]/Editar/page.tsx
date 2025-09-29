import { Form } from '#@/components/Form/Form';
import { CarpetaForm } from '#@/components/Form/carpeta-form';

export default function PageCarpetaId(
  {
    params,
  }: {
    params: { numero: string };
  } 
) {
  return (
    <>
      <CarpetaForm>
        <Form key={params.numero} />
      </CarpetaForm>
    </>
  );
}
