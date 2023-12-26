import { CalendarBuilder, nombresDeMeses } from '#@/lib/project/calendar';
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
                          const {
                            date, href, current, className 
                          } = row;

                          const setToday = date === today.getDate();

                          return (
                            <Link
                              key={href}
                              href={`/Tareas/${ href }`}
                              className={
                                current
                                  ? setToday
                                    ? calendar.active
                                    : className === 'today'
                                      ? calendar.today
                                      : calendar.inactive
                                  : calendar.disabled
                              }
                            >
                              {date.toString()}
                            </Link>
                          );
                } 
              )}
            </div>
          </div>
        </div>
      );
}
