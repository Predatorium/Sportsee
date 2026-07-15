import { useUser } from "../../context/UserContext";
import './Achievement.css';

export default function Achievement() {
    const { statistics } = useUser();

    return (
        <div className="distance-info">
            <p className="text">Distance totale parcourue</p>
            <div className="distance-value">
                <img src="/images/kilometre.svg" alt="Logo kilometre" className="kilometre"/>
                <p className="stat">{statistics.totalDistance} km</p>
            </div>
        </div>
    );
}