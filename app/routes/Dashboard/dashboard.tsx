import WeeklyDistanceChart from "~/components/WeeklyDistanceChart";
import WeeklyHeartRateChart from "~/components/WeeklyHeartRateChart";
import HeaderProfile from "~/components/HeaderProfile";
import Achievement from "~/components/Achievement";
import './dashboard.css';
import { formatDateReverse, getMondayOfWeek } from "~/services/dateUtils";
import RunningWeekGoal from "~/components/RunningWeekGoal";

export default function Dashboard() {
    const today = new Date();    
    const monday = getMondayOfWeek(today);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const rangeLabel = `Du ${formatDateReverse(monday)} au ${formatDateReverse(sunday)}`;
    
    return (
        <div className="dashboard">
            <HeaderProfile >
                <Achievement />
            </HeaderProfile>
            <h1 className="dashboard-perf">Vos dernières performances</h1>
            <div className="dashboard-graph">
                <div className="graph-distance">
                    <WeeklyDistanceChart  />
                </div>
                <div className="graph-bpm">
                    <WeeklyHeartRateChart  />
                </div>
            </div>
            <div className="header-week-stat">
                <h2 className="title">Cette Semaine</h2>
                <p className="subtitle">{rangeLabel}</p>
            </div>
            <RunningWeekGoal/>
        </div>
    );
}