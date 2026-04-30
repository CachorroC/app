export default function TaskRow() {
  return (
    <div
      style={{
        display   : 'flex',
        gap       : 12,
        alignItems: 'center',
        padding   : '8px 0',
      }}
    >
      <input
        type="checkbox"
        style={{
          width      : 18,
          height     : 18,
          accentColor: 'var(--primary)',
        }}
      />
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            fontWeight: 500,
          }}
        >
          Solicitar Liquidación
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color   : 'var(--error)',
          }}
        >
          Vence: Mañana
        </div>
      </div>
    </div>
  );
}