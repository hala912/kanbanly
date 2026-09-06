// src/context/AuthContext.tsx
import { createContext, useContext} from 'react'
import type { Session, User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
})



export function useAuth() {
  return useContext(AuthContext)
}