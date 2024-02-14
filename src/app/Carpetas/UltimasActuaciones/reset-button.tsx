'use client';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { MonCarpeta } from '#@/lib/types/carpetas';

export function ResetButtonSorter(
  {
    carpetas 
  }: { carpetas: MonCarpeta[] } 
) {
      const dispatchCarpetas = useCarpetaSortDispatch();
      return (
        <button
          type="button"
          onClick={() => {
                    return dispatchCarpetas(
                      {
                        type   : 'reset',
                        payload: carpetas,
                      } 
                    );
          }}
        >
          <span className="material-symbols-outlined">device_reset</span>
        </button>
      );
}
