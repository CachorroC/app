import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asesor Jurídico — Carpetas',
  description: 'Gestión de carpetas y procesos jurídicos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/*
        Theme: omit data-theme to follow the OS; set "light" or "dark" to pin.
        A theme toggle can flip document.documentElement.dataset.theme.
        Material Symbols are self-hosted via globals.css @font-face.
      */}
      <body>{children}</body>
    </html>
  );
}
