import { cardHeader,
  cardIcon,
  cardTitle, } from '#@/styles/proto-styles.module.css';
import { CSSProperties } from 'react';

export default function CardHeader( {
  title,
  icon,
  titleStyle,
  style,
}: {
  title      : string;
  icon       : string;
  titleStyle?: CSSProperties;
  style?     : CSSProperties;
} ) {
  return (
    <div
      className={cardHeader}
      style={style}
    >
      <span
        className={cardTitle}
        style={titleStyle}
      >
        {title}
      </span>
      <span className={`material-symbols-outlined ${ cardIcon }`}>{icon}</span>
    </div>
  );
}
