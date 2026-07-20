import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useActivity } from "../../context/ActivityContext";
import ChartHeader from "../ChartHeader";
import './WeeklyDistanceChart.css';
import { useWeekPagination } from "~/hooks/useWeekPagination";

export default function WeeklyDistanceChart() {
  const sessions = useActivity();
  const { data, average, rangeLabel, goBack, goForward, canGoBack, canGoForward } = useWeekPagination(sessions);

  return (
    <div className="chart-distance">
      <ChartHeader 
        title={`${average}km en moyenne`}
        subtitle="Total des kilomètres 4 dernières semaines"
        rangeLabel={rangeLabel}
        onGoBack={goBack}
        onGoForward={goForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      >
        <ResponsiveContainer width="100%" height={307}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} />
            <YAxis tickLine={false}/>
            <Bar dataKey="km" fill="#2563eb" radius={[10, 10, 10, 10]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>

        <div className="weekly-chart-legend">
          <div className="chart-dot"></div>
          <p className="chart-footer-text">Km</p>
        </div>
      </ChartHeader>
    </div>
  );
}