'use client';

import { useState } from 'react';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import { Scanner } from '@yudiel/react-qr-scanner';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { useFacturaSort } from './facturas-context-provider';
import { parseFacturaElectronica } from './helper/factura-electronica-parser';

export function ButtonScan() {
  const {
    valorState, setValorState 
  } = useNuevaFacturaContext();

  const [
    isScannerOpen,
    setIsScannerOpen
  ] = useState(
    false 
  );
  return (
    <>
      <button
        onClick={() => {
          return setIsScannerOpen(
            (
              e 
            ) => {
              return !e;
            } 
          );
        }}
      >
        <span className="material-symbols-outlined">qr_code_scanner</span>
      </button>

      {isScannerOpen && (
        <div
          style={{
            width : '250px',
            height: '250px',
          }}
        >
          <Scanner
            onResult={(
              result 
            ) => {
              const parsedValues = parseFacturaElectronica(
                result 
              );

              return setValorState(
                {
                  ...valorState,
                  ...parsedValues,
                } 
              );
            }}
            onError={(
              error 
            ) => {
              return console.log(
                error?.message 
              );
            }}
          />
        </div>
      )}
    </>
  );
}

export function CopyButtonContabilidad() {
  const facturas = useFacturaSort();
  return (
    <CopyButton
      copyTxt={JSON.stringify(
        facturas 
      )}
      name={'facturas'}
    />
  );
}
