export type AuthActionState = {
  status      : 'idle' | 'submitting' | 'error' | 'success';
  fieldErrors?: Partial<Record<'email' | 'password' | 'password2' | 'nombre' | 'tarjetaProfesional', string>>;
  formError?  : string;
};

export const IDLE_STATE: AuthActionState = {
  status: 'idle'
};
