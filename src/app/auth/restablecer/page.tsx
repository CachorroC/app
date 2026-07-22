import { AuthPanelShell } from '../components/auth-panel-shell';
import { RequestResetForm } from './request-reset-form';

export default function RestablecerPage() {
  return (
    <AuthPanelShell>
      <RequestResetForm />
    </AuthPanelShell>
  );
}
