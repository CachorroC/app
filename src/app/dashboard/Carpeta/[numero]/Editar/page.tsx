import { Form } from '#@/components/Form/Form';
import { CarpetaForm } from '#@/components/Form/carpeta-form';

export default async function PageCarpetaId( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ) {
  const {
    numero 
  } = await params;

  return (
    <>
      <CarpetaForm>
        <Form key={numero} />
      </CarpetaForm>
    </>
  );
}
