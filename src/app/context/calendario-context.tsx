'use client';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState, } from 'react';

type CalModel = {
  ano: number;
  mes: number;
  dia: number;
};

export const CalendarContext = createContext<{
  calendarState: CalModel;
  setCalendarState: Dispatch<SetStateAction<CalModel>>;
} | null>(
  null
);

export function CalendarContextProvider(
  {
    children, date
  }: {
    children: ReactNode; date:Date }
) {

  const [
    calendarState,
    setCalendarState
  ] = useState(
    {
      ano: date.getFullYear(),
      mes: date.getMonth(),
      dia: date.getDate()
    }
  );
  return (
    <CalendarContext.Provider
      value={{
        calendarState,
        setCalendarState,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(
    CalendarContext
  );

  if ( context === null ) {
    throw new Error(
      'el calendar context debe ser utilizado dentro de un calendar context.provider'
    );
  }
}
