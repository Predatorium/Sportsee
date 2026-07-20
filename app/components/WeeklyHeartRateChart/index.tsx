import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useActivity } from "../../context/ActivityContext";
import ChartHeader from "../ChartHeader";
import './WeeklyHeartRateChart.css';
import { useWeekHeartRate } from "~/hooks/useWeekHeartRate";

export default function HeartRateChart() {
  const sessions = useActivity();
  const { data, average, rangeLabel, goBack, goForward, canGoBack, canGoForward } = useWeekHeartRate(sessions);

  return (
    <div className="chart-heartRate">
      <ChartHeader
        title={`${average} BPM`}
        subtitle="Fréquence cardiaque moyenne"
        rangeLabel={rangeLabel}
        onGoBack={goBack}
        onGoForward={goForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      >
        <ResponsiveContainer width="100%" height={307}>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} />
            <YAxis tickLine={false} />
            <Bar dataKey="minBpm" fill="#fecaca" radius={[10, 10, 10, 10]} barSize={12} />
            <Bar dataKey="maxBpm" fill="#ef4444" radius={[10, 10, 10, 10]} barSize={12} />
            <Line type="monotone" dataKey="average" fill="#F2F3FF" dot={{ fill:"#0B23F4", r: 4 }} activeDot={{ stroke:'#0B23F4', r: 4}} />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="heartRate-chart-legend">
          <div className="min">
            <div className="chart-dot"></div>
            <p className="chart-footer-text">Min BPM</p>
          </div>
          <div className="max">
            <div className="chart-dot"></div>
            <p className="chart-footer-text">Max BPM</p>
          </div>
          <div className="average">
            <div className="chart-dot"></div>
            <p className="chart-footer-text">Average BPM</p>
          </div>
        </div>
      </ChartHeader>
    </div>
  );
}