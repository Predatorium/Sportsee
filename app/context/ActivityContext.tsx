import { createContext, useContext } from "react";

export type HeartRate = {
    min: number;
    max: number;
    average: number;
}

export type Session = {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
};

const ActivityContext = createContext<Session[] | null>(null);

export function ActivityProvider({
    value,
    children,
}: {
    value: Session[];
    children: React.ReactNode;
}) {
    return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivity() {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error("useActivity doit être utilisé à l'intérieur d'un ActivityProvider");
    }
    return context;
}