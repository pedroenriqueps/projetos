"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

type ProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
