import { getWeekNumber, getISOWeekYear, getMondayOfISOWeek, formatDate, getMondayOfWeek } from "./dateUtils";
import type { Session } from "../context/ActivityContext"

type WeeklyData = { 
  week: string;
  km: number;
  startDate: string;
  endDate: string
};

export function aggregateKmByWeek(sessions: Session[]): WeeklyData[] {
  const weekMap = new Map<string, { year: number; week: number; km: number }>();

  sessions.forEach((session) => {
    const date = new Date(session.date);
    const week = getWeekNumber(date);
    const year = getISOWeekYear(date);
    const key = `${year}-${week}`;

    const entry = weekMap.get(key) ?? { year, week, km: 0 };
    entry.km += session.distance;
    weekMap.set(key, entry);
  });

  return Array.from(weekMap.values())
    .sort((a, b) => a.year - b.year || a.week - b.week)
    .map(({ year, week, km }, index) => {
      const monday = getMondayOfISOWeek(year, week);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      return {
        week: `S${index + 1}`,
        km: Math.round(km * 10) / 10,
        startDate: formatDate(monday),
        endDate: formatDate(sunday),
      };
    });
}

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

type DayHeartRate = {
  day: string;
  date: string;
  minBpm: number;
  maxBpm: number;
  average: number;
};

export function aggregateHeartRateByDay(monday: Date, sessions: Session[]): DayHeartRate[] {
  const days: DayHeartRate[] = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    const dateStr = formatDate(current);

    const session = sessions.find((s) => s.date === dateStr);

    days.push({
      day: DAY_LABELS[i],
      date: dateStr,
      minBpm: session?.heartRate.min ?? 0,
      maxBpm: session?.heartRate.max ?? 0,
      average: session?.heartRate.average ?? 0,
    });
  }

  return days;
}

type WeekActivity = {
    nbSession: number;
    duration: number;
    distance: string;
}

export function getCurrentWeekStats(sessions: Session[]): WeekActivity {

  const today = new Date();
  const monday = getMondayOfWeek(today);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  let nbSession = 0;
  let duration = 0;
  let distance = 0;

  for (let i = sessions.length - 1; i >= 0; i--) {
    const sessionDate = new Date(sessions[i].date);

    if (sessionDate >= monday && sessionDate <= sunday) {
      nbSession++;
      duration += sessions[i].duration;
      distance += sessions[i].distance;
    } else if (sessionDate < monday) {
      break;
    }
  }

  return {
    nbSession,
    duration,
    distance: distance.toFixed(1),
  };
}