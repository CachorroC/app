export interface calendarData {
  href: string;
  className: string;
  current: boolean;
  dayOfWeek: number;
}

export const nombreDiasSemana = [
  'Mimingo',
  'L.unes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
];

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
  date?: string
) {
  const rows = new Set<calendarData>();

  const todayNow = date
    ? new Date(
      date
    )
    : new Date();

  console.log(
    todayNow
  );


  const currentMonth = todayNow.getMonth();

  const currentYear = todayNow.getFullYear();

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
    const href = `${ currentYear }-${ currentMonth - 1 }-${
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

    const href = `${ currentYear }-${ currentMonth }-${ dayInMonth }`;

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
          : 'innactive',
      }
    );
  }

  for ( let dayAfterMonth = lastDayofMonth; dayAfterMonth < 6; dayAfterMonth++ ) {
    const href = `${ currentYear }-${ currentMonth + 1 }-${ dayAfterMonth }`;

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
