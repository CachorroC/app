'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
// Import the styles object
import styles from './login.module.css';
import { Route } from 'next';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [
    error,
    setError
  ] = useState( '' );
  const callbackUrl = searchParams.get( 'callbackUrl' ) || '/Carpetas';

  async function handleSubmit( e: FormEvent<HTMLFormElement> ) {
    e.preventDefault();
    const formData = new FormData( e.currentTarget );

    const res = await signIn(
      'credentials', {
        email   : formData.get( 'email' ),
        password: formData.get( 'password' ),
        redirect: false,
      }
    );

    if ( res?.error ) {
      setError( 'Invalid credentials' );
    } else {
      router.push( callbackUrl as Route );
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign In
        </button>
        <button className={styles.button} onClick={() => {
          return router.push( '/register' as Route );
        }}
        >
          Register
        </button>
        <Link className={styles.button} href={'/register' as Route}>Login</Link>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}