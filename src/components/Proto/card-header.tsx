import { cardHeader, cardIcon, cardTitle } from '#@/styles/proto-styles.module.css';

export default function CardHeader( {
  title, icon
}: { title: string; icon: string } ) {
  return (
    <div className={cardHeader}>
      <span className={cardTitle}>{title}</span>
      <span className={`material-symbols-outlined ${ cardIcon }`}>{icon}</span>
    </div>
  );
}