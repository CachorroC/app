import { AuthShell } from './components/auth-shell';
import { AuthMode } from './components/segmented-toggle';

type SearchParams = { mode?: string };

export default async function AuthPage( {
  searchParams
}: { searchParams: Promise<SearchParams> } ) {
  const sp = await searchParams;
  const initialMode: AuthMode = sp.mode === 'register'
    ? 'register'
    : 'login';

  return <AuthShell initialMode={initialMode} />;
}
