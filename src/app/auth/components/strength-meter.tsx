import { passwordScore } from '#@/lib/auth/password';
import styles from './strength-meter.module.css';

const META = [
  {
    label: '—',
    color: 'var(--color-on-surface-variant)',
    fill : 'var(--color-outline)'
  },
  {
    label: 'Débil',
    color: 'var(--color-error)',
    fill : 'var(--color-error)'
  },
  {
    label: 'Regular',
    color: 'var(--color-tertiary)',
    fill : 'var(--color-tertiary)'
  },
  {
    label: 'Buena',
    color: 'var(--color-primary)',
    fill : 'var(--color-primary)'
  },
  {
    label: 'Fuerte',
    color: 'var(--color-primary)',
    fill : 'var(--color-primary)'
  },
];

export const StrengthMeter = ( {
  password 
}: { password: string } ) => {
  const score = passwordScore( password );
  const meta = META[ password
    ? score
    : 0 ];

  return (
    <div className={styles.row}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{
            width: `${ ( password
              ? score / 4
              : 0 ) * 100 }%`,
            background: meta.fill,
          }}
        />
      </div>
      <span className={styles.label} style={{
        color: meta.color 
      }}
      >{meta.label}</span>
    </div>
  );
};
