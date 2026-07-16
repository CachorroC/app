'use client';

import { Icon } from '#@/components/ui';
import type { MemorialTemplate } from '#@/memoriales/manifests/types';
import styles from './template-selector.module.css';

/**
 * Props for `TemplateSelector` — the available `templates`, the currently
 * `selectedId` (or `null` if none), and the callback fired when the user
 * picks a template.
 */
interface TemplateSelectorProps {
  templates : MemorialTemplate[];
  selectedId: string | null;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onSelect  : ( id: string ) => void;
}

/**
 * Renders the memorial template picker: a `<select>` dropdown and a
 * clickable, keyboard-accessible card grid of templates, both kept in sync
 * via `selectedId`/`onSelect`.
 *
 * @param props - See {@link TemplateSelectorProps}.
 */
export function TemplateSelector( {
  templates,
  selectedId,
  onSelect,
}: TemplateSelectorProps ) {
  return (
    <section className={styles.section}>
      <div className={styles.selectWrap}>
        <label
          htmlFor="template-select"
          className={styles.label}
        >
          Seleccione un memorial
        </label>
        <select
          id="template-select"
          className={styles.select}
          value={selectedId ?? ''}
          onChange={( event ) => {
            return onSelect( event.target.value );
          }}
        >
          <option
            value=""
            disabled
          >
            Elija un tipo de memorial…
          </option>
          {templates.map( ( template ) => {
            return (
              <option
                key={template.id}
                value={template.id}
              >
                {template.displayName}
              </option>
            );
          } )}
        </select>
      </div>

      <div className={styles.grid}>
        {templates.map( ( template ) => {
          const selected = template.id === selectedId;

          return (
            <div
              key={template.id}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              onClick={() => {
                return onSelect( template.id );
              }}
              onKeyDown={( event ) => {
                if ( event.key === 'Enter' || event.key === ' ' ) {
                  event.preventDefault();
                  onSelect( template.id );
                }
              }}
              className={`${ styles.card } ${
                selected
                  ? styles.cardSelected
                  : ''
              }`}
            >
              <Icon
                name="gavel"
                className={styles.cardIcon}
                size={26}
              />
              <div className={styles.cardTitle}>{template.displayName}</div>
              <div className={styles.cardDescription}>
                {template.description}
              </div>
            </div>
          );
        } )}
      </div>
    </section>
  );
}
