import { useState } from "react";
import type { Session } from "~/context/ActivityContext";
import { aggregateKmByWeek } from "~/services/aggregateData";
import { formatDateFrWithoutYear } from "~/services/dateUtils";

export function useWeekPagination(sessions: Session[], weeksPerPage = 4)  {
  const [offset, setOffset] = useState(0);

  const allWeeks = aggregateKmByWeek(sessions);
  const end = allWeeks.length - offset * weeksPerPage;
  const start = Math.max(0, end - weeksPerPage);

  const data = allWeeks.slice(start, end).map((d, index) => ({...d, week: `${index + 1}`, }));
  
  const average = data.length ? Math.round(data.reduce((sum, d) => sum + d.km, 0) / data.length) : 0;
  const rangeLabel = data.length > 0 ? `${formatDateFrWithoutYear(data[0].startDate)} - ${formatDateFrWithoutYear(data[data.length - 1].endDate)}` : "";

  const canGoBack = start > 0;
  const canGoForward = offset > 0;

  return {
    data,
    average,
    rangeLabel,
    goBack: () => setOffset((o) => o + 1),
    goForward: () => setOffset((o) => o - 1),
    canGoBack,
    canGoForward,
  };
}