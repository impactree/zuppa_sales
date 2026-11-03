'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

function ClientProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}

export default ClientProvider;
