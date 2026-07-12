'use client';

import OutputDateHelper from '#@/lib/project/output-date-helper';
import React from 'react';

/**
 * Props for the TaskRow component.
 * @property {string} title - The title of the task.
 * @property {string} [dueDate] - Optional due date text.
 * @property {boolean} [isCompleted] - Whether the task is marked as completed.
 * @property {string} [color] - Optional color for the due date text.
 * @property {() => void} [onToggle] - Callback when the checkbox is toggled.
 */
interface TaskRowProps {
  id?      : string;
  title    : string;
  dueDate? : Date | null;
  completed: boolean;
  color?   : string;
  onToggle?: () => void;
}

/**
 * A reusable task row component that displays a task with a checkbox,
 * title, and optional due date.
 */
export default function TaskRow( {
  title,
  dueDate,
  completed,
  color,
  onToggle,
}: TaskRowProps ) {
  const getDueDateColor = () => {
    if ( color ) {
      return color;
    }

    if ( !dueDate ) {
      return 'var(--secondary, #666)';
    }

    // Try to parse the date from the string
    // Standardizing formats like "Vence: 2026-05-15" or just "2026-05-15"
    const dateStr = dueDate;
    const due = new Date( dateStr );

    if ( !isNaN( due.getTime() ) ) {
      const now = new Date();
      // Set now to start of day for accurate day difference
      now.setHours(
        0, 0, 0, 0 
      );

      const diffTime = due.getTime() - now.getTime();
      const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );

      if ( diffDays <= 7 ) {
        // Within the following week or already passed
        return 'var(--error)';
      }

      if ( diffDays <= 30 ) {
        // Within the next month
        return 'var(--warning)';
      }

      if ( diffDays >= 30 ) {
        return 'var(--caution)';
      }
    }

    return 'var(--text-secondary, #666)';
  };

  return (
    <div
      style={{
        display   : 'flex',
        gap       : 12,
        alignItems: 'center',
        padding   : '8px 0',
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        style={{
          width      : 18,
          height     : 18,
          accentColor: 'var(--primary)',
          cursor     : 'pointer',
        }}
      />
      <div
        style={{
          flex          : 1,
          textDecoration: completed
            ? 'line-through'
            : 'none',
          opacity: completed
            ? 0.6
            : 1,
          transition: 'all 0.2s ease',
        }}
      >
        <div
          style={{
            fontWeight: 500,
          }}
        >
          {title}
        </div>
        {!completed && dueDate && (
          <div
            style={{
              fontSize: '0.8rem',
              color   : getDueDateColor(),
            }}
          >
            <OutputDateHelper incomingDate={dueDate} />
          </div>
        )}
      </div>
    </div>
  );
}
