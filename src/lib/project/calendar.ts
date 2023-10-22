

export interface calendarData {
  href: string;
  className: string;
  current: boolean;
  dayOfWeek: number;
}

export const nombresDeMeses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function CalendarBuilder(
  date: Date,
) {
  const rows = new Set<calendarData>();


  const currentMonth = date.getMonth();

  const currentYear = date.getFullYear();

  const today = new Date()
    .getDate();

  const firstDayofCurrentMonth = new Date(
    currentYear,
    currentMonth,
    1,
  )
    .getDay();

  const lastDateofMonth = new Date(
    currentYear, currentMonth + 1, 0
  )
    .getDate();

  const lastDayofMonth = new Date(
    currentYear,
    currentMonth,
    lastDateofMonth,
  )
    .getDay();

  const lastDateofPastMonth = new Date(
    currentYear, currentMonth, 0
  )
    .getDate();

  for ( let dayBefore = firstDayofCurrentMonth; dayBefore > 0; dayBefore-- ) {
    const href = `${ currentYear }/${ currentMonth }/${
      lastDateofPastMonth - dayBefore + 1
    }`;
    rows.add(
      {
        href     : href,
        className: 'disabled',
        current  : false,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
      }
    );
  }

  for ( let dayInMonth = 1; dayInMonth <= lastDateofMonth; dayInMonth++ ) {
    const isToday = today === dayInMonth;

    const href = `${ currentYear }/${ currentMonth + 1 }/${ dayInMonth }`;

    rows.add(
      {
        href     : href,
        current  : true,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
        className: isToday
          ? 'today'
          : 'inactive',
      }
    );
  }

  for ( let dayAfterMonth = lastDayofMonth; dayAfterMonth < 6; dayAfterMonth++ ) {
    const href = `${ currentYear }/${ currentMonth + 2 }/${ dayAfterMonth }`;

    rows.add(
      {
        href     : href,
        current  : false,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
        className: 'disabled',
      }
    );
  }

  return Array.from(
    rows
  );
}
