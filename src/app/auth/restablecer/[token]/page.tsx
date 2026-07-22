import { AuthPanelShell } from '../../components/auth-panel-shell';
import { ResetPasswordForm } from './reset-password-form';

export default async function RestablecerTokenPage( {
  params
}: { params: Promise<{ token: string }> } ) {
  const {
    token 
  } = await params;

  return (
    <AuthPanelShell>
      <ResetPasswordForm token={token} />
    </AuthPanelShell>
  );
}
