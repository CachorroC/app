'use client';
import { Notificacion } from '#@/lib/types/carpetas';
import { useState } from 'react';
import formStyles from '../Form/form.module.css';
import styles from './styles.module.css';
import { editNotificacion } from './actions';

export function NotificacionComponent(
  {
    notificacion
  }: { notificacion: Notificacion }
) {
      const [ notificacionState, setNotificacionState ] = useState<Notificacion>(
        notificacion
      );
      return (
        <div className={ styles.notificacionComponent }>
          <h2>Notificaciones</h2>
          <div className={ styles.box }>
            <h3>Certimail</h3>
            <label className={formStyles.switchBox}>
              <input
                className={formStyles.inputElement}
                type="checkbox"
                role="switch"
                name='certimail'
                checked={notificacionState.certimail ?? false}
                onChange={async (
                  e
                ) => {
                          const revis = await editNotificacion(
                            {
                              ...notificacionState,
                              certimail: e.target.checked,
                            }
                          );

                          if ( revis.data ) {
                            setNotificacionState(
                              {
                                ...revis.data
                              }
                            );
                          }
                }}
              />
              {/* <span className={ styles.slider }aria-hidden="true"></span> */}

              <span
                className={formStyles.decor}
                data-switch-input-state="on"
                aria-hidden="true"
              >
          On
              </span>
              <span
                className={formStyles.decor}
                data-switch-input-state="off"
                aria-hidden="true"
              >
          Off
              </span>
              <span
                className={formStyles.thumb}
                aria-hidden="true"
              ></span>
            </label>

          </div>

          <div className={ styles.box }>
            <h3>Físico</h3>
            <label className={formStyles.switchBox}>
              <input
                className={formStyles.inputElement}
                type="checkbox"
                role="switch"
                name='fisico'
                checked={notificacionState.certimail ?? false}
                onChange={async (
                  e
                ) => {
                          const revis = await editNotificacion(
                            {
                              ...notificacionState,
                              fisico: e.target.checked,
                            }
                          );

                          if ( revis.data ) {
                            setNotificacionState(
                              {
                                ...revis.data
                              }
                            );
                          }
                }}
              />
              {/* <span className={ styles.slider }aria-hidden="true"></span> */}

              <span
                className={formStyles.decor}
                data-switch-input-state="on"
                aria-hidden="true"
              >
          On
              </span>
              <span
                className={formStyles.decor}
                data-switch-input-state="off"
                aria-hidden="true"
              >
          Off
              </span>
              <span
                className={formStyles.thumb}
                aria-hidden="true"
              ></span>
            </label>

          </div>
        </div>
      );
}