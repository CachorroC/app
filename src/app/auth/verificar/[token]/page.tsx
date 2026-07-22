import { verifyEmail } from '../../actions';
import { AuthPanelShell } from '../../components/auth-panel-shell';
import styles from '../../restablecer/request-reset-form.module.css';

export default async function VerificarTokenPage( {
  params
}: { params: Promise<{ token: string }> } ) {
  const {
    token 
  } = await params;
  const resultado = await verifyEmail( token );

  return (
    <AuthPanelShell>
      <div style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : 'var(--spacing-4)',
        textAlign    : 'center'
      }}
      >
        {resultado.ok
          ? (
              <>
                <h1 className={styles.heading}>Correo verificado</h1>
                <div className={styles.subheading}>Su cuenta quedó activada. Ya puede iniciar sesión y usar la plataforma.</div>
              </>
            )
          : (
              <>
                <h1 className={styles.heading}>Este enlace ya no es válido</h1>
                <div className={styles.subheading}>Solicite un nuevo enlace de verificación desde su cuenta.</div>
              </>
            )}
        <div className={styles.back}><a href="/auth">Volver al inicio de sesión</a></div>
      </div>
    </AuthPanelShell>
  );
}
