export default function MoneyFixer (
  {
    valor, className
  }: {valor: number | bigint; className: string}
) {
      const formatedValue = new Intl.NumberFormat(
        'es-CO', {
          style          : 'currency',
          currency       : 'COP',
          currencyDisplay: 'symbol',
        }
      )
            .format(
              valor
            );
      return (
        <strong className={className}>{formatedValue}</strong>
      );
}