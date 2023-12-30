import { MonCarpeta } from './types/carpetas';

export function carpetasChopper(
  {
    carpetas
  }: {carpetas: MonCarpeta[]}
) {
      const chunkSize = 100;

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
