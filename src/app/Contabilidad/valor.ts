export function impuestosCalculator(
  {
    valorTotal,
    hasIva,
    hasIcui,
    impoConsumo,
    fecha,
  }: {
  valorTotal: number;
  hasIva: boolean;
  hasIcui: boolean;
  impoConsumo: 0 | 4 | 8;
  fecha: Date;
} 
) {
  const currentYear = fecha.getFullYear();

  const outputMap = new Map();
  let valorBase = valorTotal;

  outputMap.set(
    'valorTotal', valorTotal 
  );

  if ( hasIva ) {
    outputMap.set(
      'valorIva', valorTotal - valorTotal / 1.19 
    );
    valorBase = valorBase / 1.19;
    outputMap.set(
      'valorBase', valorBase 
    );
  }

  if ( hasIcui ) {
    if ( currentYear < 2024 ) {
      outputMap.set(
        'valorIcui', valorTotal - valorTotal / 1.2 
      );
      valorBase = valorBase / 1.2;
      outputMap.set(
        'valorBase', valorBase 
      );
    }

    outputMap.set(
      'valorIcui', valorTotal - valorTotal / 1.15 
    );
    valorBase = valorBase / 1.15;
    outputMap.set(
      'valorBase', valorBase 
    );
  }

  if ( impoConsumo > 0 ) {
    if ( impoConsumo === 8 ) {
      outputMap.set(
        'impoConsumo', valorTotal - valorTotal / 1.08 
      );
      valorBase = valorBase / 1.08;
    } else if ( impoConsumo === 4 ) {
      outputMap.set(
        'impoConsumo', valorTotal - valorTotal / 1.04 
      );
      valorBase = valorBase / 1.04;
    }

    outputMap.set(
      'valorBase', valorBase 
    );
  }

  return Object.fromEntries(
    outputMap 
  );
}
