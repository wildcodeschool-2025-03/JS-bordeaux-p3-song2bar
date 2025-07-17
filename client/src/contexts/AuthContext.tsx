import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { AuthType } from "../types/User";

interface AuthContextType {
  auth: AuthType | null;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("erreur");
  }

  return value;
};
