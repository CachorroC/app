import { dataLabel, dataRow, dataValue } from '#@/styles/proto-styles.module.css';
import { CSSProperties } from 'react';

export default function DataRow( {
  label,
  value,
  style,
  labelStyle,
  valueStyle,
  money = false
}: {
  label      : string;
  value      : string | number | null | undefined;
  style?     : CSSProperties;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
  money?     : boolean;
} ) {
  const copFormatter = new Intl.NumberFormat(
    'es-CO', {
      style   : 'currency',
      currency: 'COP',
    }
  );

  return (
    <div className={dataRow} style={style}>
      <span className={dataLabel} style={labelStyle}>{label}</span>
      <span className={dataValue} style={valueStyle}>{money
        ? copFormatter.format( Number( value )  )
        : value}</span>
    </div>
  );
}
