'use client';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { resetCarpetas } from '../actions';

export function ResetButtonSorter() {
      const dispatchCarpetas = useCarpetaSortDispatch();
      return (
        <button
          type="button"
          onClick={ async () => {
                    const carpetas = await resetCarpetas();

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
