import { CalendarBuilder, nombresDeMeses } from '#@/lib/project/calendar';
import type { Route } from 'next';
import Link from 'next/link';
import calendar from './calendar.module.css';

export function Calendar(
  {
    date
  }: { date?: Date }
) {

  const today = date
    ? date
    : new Date();

  console.log(
    `calndar: ${ today }`
  );

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();

  const rows = CalendarBuilder(
    today
  );

  return (
    <div className={calendar.container}>
      <p>{nombresDeMeses[ currentMonth ] + currentYear}</p>
      <div className={calendar.calendar}>
        <div className={calendar.weeks}>
          <li className={calendar.dias}>D</li>
          <li className={calendar.dias}>L</li>
          <li className={calendar.dias}>M</li>
          <li className={calendar.dias}>M</li>
          <li className={calendar.dias}>J</li>
          <li className={calendar.dias}>V</li>
          <li className={calendar.dias}>S</li>
        </div>
        <div className={calendar.days}>
          {rows.map(
            (
              row
            ) => {
              const day = new Date(
                row.href
              )
                .getDate();

              const setToday = day === today.getDate();

              return (
                <Link
                  key={row.href}
                  href={`/Notas/Fecha/${ row.href }` as Route}
                  className={
                    row.current
                      ? setToday
                        ? calendar.active
                        : row.className === 'today'
                          ? calendar.today
                          : calendar.inactive
                      : calendar.disabled
                  }
                >
                  {day}
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
