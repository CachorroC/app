'use client';
import { useTable } from '#@/app/Context/TableContext';
import React from 'react';

// We make this component generic so you can reuse it for Categories, Status, etc.
interface MultiSelectProps {
  filterKey: string;     // e.g., 'category'
  options: string[];     // e.g., ['terminados', 'bancolombia', 'reintegra', 'insolvencia']
  label: string;         // e.g., 'Filter Categories'
}

export const MultiSelectFilter: React.FC<MultiSelectProps> = (
  {
    filterKey, options, label
  }
) => {
  const {
    state, dispatch
  } = useTable<any>();

  // 1. Get the current array from state (or default to empty array)
  const currentSelection = ( state.filters[ filterKey ] as string[] ) || [];

  // 2. Handler to toggle a specific option
  const toggleOption = (
    option: string
  ) => {
    let newSelection = [
      ...currentSelection
    ];

    if ( newSelection.includes(
      option
    ) ) {
      // Remove if exists
      newSelection = newSelection.filter(
        item => {
          return item !== option;
        }
      );
    } else {
      // Add if doesn't exist
      newSelection.push(
        option
      );
    }

    // 3. Dispatch based on result
    if ( newSelection.length === 0 ) {
      // If empty, usually we want to clear the filter so "All" are shown
      dispatch(
        {
          type   : 'CLEAR_FILTER',
          payload: filterKey
        }
      );
    } else {
      dispatch(
        {
          type   : 'SET_FILTER',
          payload: {
            key  : filterKey,
            value: newSelection
          }
        }
      );
    }
  };

  return (
    <div style={{
      border      : '1px solid #ccc',
      padding     : '10px',
      borderRadius: '8px',
      minWidth    : '200px'
    }}
    >
      <h4 style={{
        margin  : '0 0 10px 0',
        fontSize: '14px'
      }}
      >{label}</h4>

      <div style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : '5px'
      }}
      >
        {options.map(
          (
            option
          ) => {
            const isChecked = currentSelection.includes(
              option
            );

            return (
              <label key={option} style={{
                display   : 'flex',
                alignItems: 'center',
                fontSize  : '14px',
                cursor    : 'pointer'
              }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    return toggleOption(
                      option
                    );
                  }}
                  style={{
                    marginRight: '8px'
                  }}
                />
                {option}
              </label>
            );
          }
        )}
      </div>

      {/* Optional: Helper text */}
      <div style={{
        fontSize : '11px',
        color    : '#666',
        marginTop: '5px'
      }}
      >
        {currentSelection.length === 0
          ? 'Showing all'
          : `Showing ${ currentSelection.length } selected`}
      </div>
    </div>
  );
};