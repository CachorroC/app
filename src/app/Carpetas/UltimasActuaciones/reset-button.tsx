'use client';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';

export function ResetButtonSorter() {
      const dispatchCarpetas = useCarpetaSortDispatch();
      return (
        <button
          type="button"
          onClick={ () => {

                    return dispatchCarpetas(
                      {
                        type: 'reset',
                      }
                    );
          }}
        >
          <span className="material-symbols-outlined">device_reset</span>
        </button>
      );
}
