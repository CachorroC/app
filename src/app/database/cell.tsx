'use client';

import { Field, TableRow } from '#@/lib/types/api-models';
import { useCellEditingContext } from '../Context/database-models-context';
import styles from './studio-clone.module.css';

export function Cell ( {
  field, rowIndex, row
}: {field: Field; rowIndex: number; row: TableRow<string>} ) {
  const {
    editingCell,
    setEditingCell,
    editValue,
    setEditValue,
    handleDoubleClick,
    handleSave, setIsEditing
  } = useCellEditingContext();
  const isEditing
    = editingCell?.rowIndex === rowIndex && editingCell?.field === field.name;

  return (
    <td
      key={field.name}
      className={styles.tableCell}
      onDoubleClick={() => {
        return handleDoubleClick(
          rowIndex, field.name, row[ field.name ]
        );
      }}
    >
      { isEditing
        ? (
            <input
              // Auto-focus the input when it appears
              autoFocus
              type="text"
              value={editValue}
              onChange={( e ) => {
                return setEditValue( e.target.value );
              }}
              // Save when the user clicks completely outside the input
              onBlur={() => {
                return handleSave(
                  rowIndex, field.name, row.id
                );
              }}
              // Save when the user presses Enter
              onKeyDown={( e ) => {
                if ( e.key === 'Enter' ) {
                  handleSave(
                    rowIndex, field.name, row.id
                  );
                }

                if ( e.key === 'Escape' ) {
                  setEditingCell( null ); // Cancel edit
                }
              }}
              className={styles.cellInput} // Add a CSS class to remove borders/backgrounds
            />
          )
        : (
            String( row[ field.name ] ?? '' )
          )}
    </td>
  );

}