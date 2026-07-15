import { LabelList, Pie, PieChart, ResponsiveContainer, Sector, type PieSectorDataItem } from 'recharts';
import { useActivity } from '~/context/ActivityContext';
import { getCurrentWeekStats } from "~/services/aggregateData";
import './RunningWeekGoal.css';

const COLORS = ['#C7CBF5', '#1E1EFF'];

function renderSector(props: PieSectorDataItem & { index?: number }) {
    const index = props.index ?? 0;
    return <Sector {...props} fill={COLORS[index % COLORS.length]} />;
}

function renderLabel(props: any) {
        const { cx, cy, midAngle, outerRadius, value, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const suffix = index === 0 ? 'restants' : 'réalisées';
    const textAnchor = x > cx ? 'start' : 'end';

    return (
        <g>
            <circle cx={x > cx ? x - 12 : x - 60} cy={y} r={4} fill={COLORS[index % COLORS.length]} />
            <text x={x} y={y} fill="#707070" fontSize={12} textAnchor={textAnchor} dominantBaseline="middle">
                {value} {suffix}
            </text>
        </g>
    );
}

export default function RunningWeekGoal() {
    const sessions = useActivity();
    
    const week = getCurrentWeekStats(sessions);
    const remaining = Math.max(6 - week.nbSession, 0);
    const data = [
        { name: 'Restant', value: remaining },
        { name: 'Réalisé', value: week.nbSession },
    ];

    return (
        <div className='running-goal'>
            <div className='graph'>
                <div className='header'>
                    <div className='container'>
                        <h3 className='header-title'>X{data[1].value}</h3>
                        <p className='header-title2'>sur objectif de {6}</p>
                    </div>
                    <p className='header-subtitle'>Courses hebdomadaire réalisées</p>
                </div>
                <ResponsiveContainer> 
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} shape={renderSector} label={renderLabel} labelLine={false} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className='stats'>
                <div className='duration'>
                    <p className='title'>Durée d’activité</p>
                    <p className='content'>
                        <span className="highlight">{week.duration} </span> 
                        minute{week.duration > 1 ? 's' : ''}
                    </p>
                </div>
                <div className='distance'>
                    <p className='title'>Distance</p>
                    <p className='content'>
                        <span className="highlight">{week.distance} </span> 
                        minute{Number(week.distance) > 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </div>
    )
}