import { Modal } from '#@/components/Modal';
import { ReactNode } from 'react';

export default function Layout( {
  children 
}: { children: ReactNode } ) {
  return <Modal>{children}</Modal>;
}
