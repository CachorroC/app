import { MonCarpeta } from './types/carpetas';

export function carpetasChopper(
  {
    carpetas,
    rangeLength = 50,
  }: {
  carpetas: MonCarpeta[];
  rangeLength?: number;
} 
) {
  const chunkSize = rangeLength;

  const chunks = [];

  for ( let i = 0; i < carpetas.length; i += chunkSize ) {
    const chunk = carpetas.slice(
      i, i + chunkSize 
    );
    chunks.push(
      chunk 
    );
  }

  return chunks;
}
