import tokens from './actuacion-tokens.module.css';
import styles from './actuacion-card-skeleton.module.css';

export function ActuacionCardSkeleton() {
  return (
    <div
      className={`${ tokens.scope } ${ styles.racsContainer }`}
      role="status"
      aria-live="polite"
      aria-label="Cargando actuación"
    >
      <div className={styles.racsCard}>
        <div className={styles.racsAccent} />
        <div className={styles.racsPad}>

          {/* BASE TIER */}
          <div className={styles.racsHeader}>
            <div style={{
              display   : 'flex',
              alignItems: 'flex-start',
              gap       : 8,
              minWidth  : 0,
              flex      : 1 
            }}
            >
              <div
                className={styles.bone}
                style={{
                  width       : 20,
                  height      : 20,
                  borderRadius: '50%',
                  flex        : '0 0 auto' 
                }}
              />
              <div style={{
                minWidth     : 0,
                flex         : 1,
                display      : 'flex',
                flexDirection: 'column',
                gap          : 6,
                paddingTop   : 2 
              }}
              >
                <div className={styles.bone} style={{
                  width : '78%',
                  height: 14 
                }}
                />
                <div className={styles.bone} style={{
                  width : '45%',
                  height: 14 
                }}
                />
              </div>
            </div>
            <div className={styles.bone} style={{
              width : 64,
              height: 14,
              flex  : '0 0 auto' 
            }}
            />
          </div>

          <div style={{
            display      : 'flex',
            flexDirection: 'column',
            gap          : 6 
          }}
          >
            <div className={styles.bone} style={{
              width : '100%',
              height: 11 
            }}
            />
            <div className={styles.bone} style={{
              width : '60%',
              height: 11 
            }}
            />
          </div>

          {/* SM TIER */}
          <div className={styles.racsSm}>
            <div className={styles.bone} style={{
              width       : 72,
              height      : 24,
              borderRadius: 'var(--md-sys-shape-corner-full)' 
            }}
            />
            <div className={styles.bone} style={{
              width : 96,
              height: 16 
            }}
            />
            <div className={styles.bone} style={{
              width : 56,
              height: 16 
            }}
            />
          </div>

          {/* MD TIER */}
          <div className={styles.racsMd}>
            <div style={{
              display       : 'flex',
              alignItems    : 'center',
              justifyContent: 'space-between',
              gap           : 10,
              flexWrap      : 'wrap' 
            }}
            >
              <div className={styles.bone} style={{
                width : 180,
                height: 12 
              }}
              />
              <div className={styles.bone} style={{
                width : 90,
                height: 12 
              }}
              />
            </div>
          </div>

          {/* LG TIER */}
          <div className={styles.racsLg}>
            <div className={styles.bone} style={{
              width : '100%',
              height: 14 
            }}
            />
          </div>

          {/* XL TIER */}
          <div className={styles.racsXl}>
            <div style={{
              display      : 'flex',
              flexDirection: 'column',
              gap          : 5,
              minWidth     : 0 
            }}
            >
              <div className={styles.bone} style={{
                width : 50,
                height: 10 
              }}
              />
              <div className={styles.bone} style={{
                width : 90,
                height: 14 
              }}
              />
            </div>
            <div style={{
              display      : 'flex',
              flexDirection: 'column',
              gap          : 5,
              minWidth     : 0 
            }}
            >
              <div className={styles.bone} style={{
                width : 70,
                height: 10 
              }}
              />
              <div className={styles.bone} style={{
                width : 110,
                height: 14 
              }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
