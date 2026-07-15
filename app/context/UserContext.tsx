// app/context/UserContext.tsx
import { createContext, useContext } from "react";

type UserProfile = {
  firstName: string;
  lastName: string;
  createdAt: string;
  age: number;
  weight: number;
  height: number;
  profilePicture: string;
};

type UserStatistics = {
  totalDistance: string;
  totalSessions: number;
  totalDuration: number;
};

type UserContextType = {
  profile: UserProfile;
  statistics: UserStatistics;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  value,
  children,
}: {
  value: UserContextType;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
}