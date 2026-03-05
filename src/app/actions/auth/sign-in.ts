'use server';
import { signIn } from '#@/auth';

export async function signInAction(provider?: string) {
  return await signIn(provider);
}
