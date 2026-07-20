import type { Session } from "~/context/ActivityContext";
import { useState } from "react";
import { formatDate, formatDateFrWithoutYear, getMondayOfWeek } from "~/services/dateUtils";
import { aggregateHeartRateByDay, aggregateKmByWeek } from "~/services/aggregateData";

export function useWeekHeartRate(sessions: Session[], daysPerPage = 7) {
    const [weekOffset, setWeekOffset] = useState(0);

    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - weekOffset * 7);

    const monday = getMondayOfWeek(targetDate);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const data = aggregateHeartRateByDay(monday, sessions);
    const validDays = data.filter((d) => d.average > 0);
    let average = 0;
    if (validDays.length > 0) {
        average = Math.round(data.reduce((sum, d) => sum + d.average, 0) / validDays.length);
    }

    const rangeLabel = `${formatDateFrWithoutYear(formatDate(monday))} - ${formatDateFrWithoutYear(formatDate(sunday))}`;

    const allWeeks = aggregateKmByWeek(sessions);
    const end = ((allWeeks.length + 1) * daysPerPage) - (weekOffset * daysPerPage);
    const start = Math.max(0, end - daysPerPage);

    const canGoBack = start > 0;
    const canGoForward = weekOffset > 0;

    return {
        data,
        average,
        rangeLabel,
        goBack: () => setWeekOffset((o) => o + 1),
        goForward: () => setWeekOffset((o) => o - 1),
        canGoBack,
        canGoForward,
    };
}

