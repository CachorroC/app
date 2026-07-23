const XLSX_MIME
  = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** Decodifica un .xlsx en base64 y dispara la descarga. Solo cliente. */
export function downloadXlsx(
  filename: string, base64: string
): void {
  const byteChars = atob( base64 );
  const byteNumbers = new Array<number>( byteChars.length );

  for ( let i = 0; i < byteChars.length; i++ ) {
    byteNumbers[ i ] = byteChars.charCodeAt( i );
  }

  const blob = new Blob(
    [
      new Uint8Array( byteNumbers )
    ], {
      type: XLSX_MIME,
    }
  );
  const url = URL.createObjectURL( blob );
  const anchor = document.createElement( 'a' );

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild( anchor );
  anchor.click();
  document.body.removeChild( anchor );
  URL.revokeObjectURL( url );
}
