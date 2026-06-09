import OutputDateHelper from '#@/lib/project/output-date-helper';
import { timelineContent, timelineDate, timelineItem } from '#@/styles/proto-styles.module.css';
import { CSSProperties } from 'react';

export default function TimelineItem( {
  date, contentTitle, contentDescription, contentStyle
}: { date: string | Date; contentTitle: string; contentDescription: string | null;  contentStyle?: CSSProperties} ) {
  return (
    <div className={timelineItem}>
      <div className={timelineDate}>
        <OutputDateHelper incomingDate={date} />
      </div>
      <div className={timelineContent} style={contentStyle}>
        <strong>{contentTitle}</strong>
        {contentDescription && (
          <p
            style={{
              fontSize : '0.9rem',
              marginTop: '4px',
            }}
          >
            {contentDescription}
          </p>
        )}
      </div>
    </div>
  );
}