
import layout from '#@/styles/layout.module.css';
import CarpetasList from '#@/components/Carpetas/client/carpetasList';

export default function Page() {
  return (
    <div className={ layout.left }>
      <CarpetasList path={ '/Procesos' } />
    </div>
  );
}
