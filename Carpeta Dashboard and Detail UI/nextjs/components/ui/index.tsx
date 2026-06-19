import styles from './ui.module.css';
import { STATUS_META } from '@/lib/format';
import type { CaseStatus } from '@/lib/types';

/** Material-style icon span (self-hosted Material Symbols Rounded). */
export function Icon({ name, fill, size = 20, className }: { name: string; fill?: boolean; size?: number; className?: string }) {
  return (
    <span
      className={`material-symbols-rounded${fill ? ' fill' : ''}${className ? ` ${className}` : ''}`}
      style={{ fontSize: size }}
      aria-hidden
    >
      {name}
    </span>
  );
}

/** Read-only lifecycle status indicator. */
export function StatusChip({ status, label }: { status: CaseStatus; label?: string }) {
  const meta = STATUS_META[status];
  return (
    <span className={styles.statusChip} style={{ background: meta.bgVar, color: meta.fgVar }}>
      <span className={styles.statusDot} />
      {label ?? meta.label}
    </span>
  );
}

/** Small colored square used as a category accent. */
export function CategoryDot({ color, size = 8 }: { color: string; size?: number }) {
  return <span className={styles.catDot} style={{ background: color, width: size, height: size }} />;
}
