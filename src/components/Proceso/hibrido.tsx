'use client';

import { useCopyToClipboard } from '#@/app/Hooks/useCopyToClipboard';
import Link from 'next/link';
import { containerEnabled } from '../Card/filled.module.css';

export const ProcesoHibrido = (
  {
    llaveProceso 
  }: { llaveProceso: string } 
) => {
  const [
    copyText,
    setCopyText
  ] = useCopyToClipboard();

  return (
    <Link
      className={containerEnabled}
      href={'https://consultasexternas.ramajudicial.gov.co/'}
      target={'_blank'}
      onClick={() => {
        return setCopyText(
          llaveProceso 
        );
      }}
    >
      <sub>ir a hibrido</sub>
      {copyText}
    </Link>
  );
};
