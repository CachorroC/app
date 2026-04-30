import { Nota } from '#@/app/generated/prisma/client';

export function notesSorter( notas: Nota[] ) {
  return notas.toSorted( (
    a, b
  ) => {
  // Split the string by ' - ' and convert both parts to numbers
    const [
      carpetaA,
      indexA
    ] = a.id.split( ' - ' )
      .map( Number );
    const [
      carpetaB,
      indexB
    ] = b.id.split( ' - ' )
      .map( Number );

    // First, compare the carpeta numbers (descending order)
    if ( carpetaA !== carpetaB ) {
      return carpetaB - carpetaA; // Higher carpeta number goes first
    }

    // If the carpeta numbers are exactly the same, compare the index numbers (descending order)
    return indexB - indexA; // Higher index number goes first
  } );
}