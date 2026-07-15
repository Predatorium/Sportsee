import type { ReactNode } from "react";
import './ChartHeader.css';

type ChartHeaderProps = {
    title: string;
    subtitle: string;
    rangeLabel: string;
    onGoBack: () => void;
    onGoForward: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
    children: ReactNode;
}

export default function ChartHeader({
    title,
    subtitle,
    rangeLabel,
    onGoBack,
    onGoForward,
    canGoBack,
    canGoForward,
    children,
}:ChartHeaderProps) {

    return (
        <div className="chart-header">
            <div className="week-head">
                <h2 className="chart-title">{title}</h2>
                <div className="week-nav">
                    <button className="week-nav-button" type="button" onClick={onGoBack}
                    disabled={!canGoBack} aria-label="Semaine précédente">‹</button>
                    <span className="date">{rangeLabel}</span>
                    <button className="week-nav-button" type="button" onClick={onGoForward}
                    disabled={!canGoForward} aria-label="Semaine suivante">›</button>
                </div>
            </div>
            <p className="chart-subtitle">{subtitle}</p>

            {children}
        </div>
    );
}