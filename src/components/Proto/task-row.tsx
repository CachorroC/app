'use client';

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
  id       : string
  text     : string;
  dueDate? : string;
  color?   : string;
  onToggle?: () => void;
  completed: boolean;
}

/**
 * A reusable task row component that displays a task with a checkbox,
 * title, and optional due date.
 */
export default function TaskRow( {
  text,
  dueDate,
  completed,
  color,
  onToggle,
}: TaskRowProps ) {
  const getDueDateColor = () => {
    if ( color ) {
      return color;
    }

    const lowerDue = dueDate?.toLowerCase() || '';

    if ( lowerDue.includes( 'mañana' ) || lowerDue.includes( 'hoy' ) ) {
      return 'var(--error)';
    }

    if ( lowerDue.includes( 'próxima semana' ) ) {
      return 'var(--warning, #ed6c02)';
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
        checked={isCompleted}
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
          textDecoration: isCompleted
            ? 'line-through'
            : 'none',
          opacity: isCompleted
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
          {text}
        </div>
        {!isCompleted && dueDate && (
          <div
            style={{
              fontSize: '0.8rem',
              color   : getDueDateColor(),
            }}
          >
            {dueDate}
          </div>
        )}
      </div>
    </div>
  );
}