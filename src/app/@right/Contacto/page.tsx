'use client';

import { useContactContext } from '#@/app/context/main-context';
import { icon } from '#@/components/layout/navbar.module.css';

export default function Page() {
  const {
    contactoForm
  } = useContactContext();

  return (
    <>
      <h1>form:</h1>
      {JSON.stringify(
        contactoForm
      )}
      <p>{contactoForm.fecha.toString()}</p>
      <span className={`material-symbols-outlined ${ icon }`}>{`toggle_${
        contactoForm.newsLetter
          ? 'on'
          : 'off'
      }`}</span>
    </>
  );
}
