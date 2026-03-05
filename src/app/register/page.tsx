'use client';
import { useState } from 'react';
// Import the styles object
import styles from './register.module.css';
import { registerUser } from '../actions/register';
import Link from 'next/link';
import { Route } from 'next';

export default function RegisterPage() {
  const [message, setMessage] = useState('');

  async function clientAction(formData: FormData) {
    const result = await registerUser(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Success! You can now login.');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form
        action={clientAction}
        className={styles.form}
      >
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className={styles.input}
        />
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
        <button
          type="submit"
          className={styles.button}
        >
          Register
        </button>
        <Link
          className={styles.button}
          href={'/login' as Route}
        >
          Login
        </Link>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
