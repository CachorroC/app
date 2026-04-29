import { dataLabel, dataRow, dataValue } from '#@/styles/proto-styles.module.css';

export default function DataRow( {
  label,
  value,
  money = false
}: {
  label : string;
  value : string | number | null | undefined;
  money?: boolean;
} ) {
  const copFormatter = new Intl.NumberFormat(
    'es-CO', {
      style   : 'currency',
      currency: 'COP',
    }
  );

  return (
    <div className={dataRow}>
      <span className={dataLabel}>{label}</span>
      <span className={dataValue}>{money
        ? copFormatter.format( Number( value )  )
        : value}</span>
    </div>
  );
}
