'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface UserContextType {
  user: Session['user'] | null;
  setUser: (user: Session['user'] | null) => void
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<Session['user'] | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      setUser(session?.user ?? null);
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user , setUser , loading: status === 'loading' }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
