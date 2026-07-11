const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/** Decodes a base64 .docx payload and triggers a browser download. Client-side only. */
export function downloadDocx(
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
      type: DOCX_MIME
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
