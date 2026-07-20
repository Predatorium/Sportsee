import HeaderProfile from "~/components/HeaderProfile";
import Statistical from "~/components/Statistical";
import { useActivity, type Session } from "~/context/ActivityContext";
import { useUser } from "~/context/UserContext";
import './profile.css'
import { formatDateFr } from "~/services/dateUtils";

function countRestDays(sessions: Session[]) {
  const dates = sessions.map(entry => new Date(entry.date));
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  // Nombre total de jours dans la période (inclusif)
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDaysInPeriod = Math.round((lastDate.getTime() - firstDate.getTime()) / msPerDay) + 1;

  const activeDays = sessions.length;

  return totalDaysInPeriod - activeDays;
}

export default function profile() {
    const User = useUser();
    const Activity = useActivity();
    const restDays = countRestDays(Activity);
    const totalCalories = Activity.reduce((sum, entry) => sum + entry.caloriesBurned, 0);

    return (
        <div className="profile">
            <div className="right-side">
                <HeaderProfile/>
                <div className="user-info">
                    <h1 className="title">Votre profil</h1>
                    <hr className="separator"/>
                    <p>Âge : {User.profile.age}</p>
                    <p>Genre : Femme</p>
                    <p>Taille : {Math.floor(User.profile.height / 100)}m{User.profile.height % 100}</p>
                    <p>Poids : {User.profile.weight}kg</p>
                </div>
            </div>
            <div className="left-side">
                <div>
                    <h2 className="title">Vos statistiques</h2>
                    <p className="subtitle">depuis le {formatDateFr(User.profile.createdAt)}</p>
                </div>
                <div className="stats">
                    <Statistical 
                        label={"Temps total couru"}
                        value={Math.floor(User.statistics.totalDuration / 60) + "h"}
                        content={(User.statistics.totalDuration % 60) + "min"} />
                    <Statistical
                        label={"Calories brûlées"}
                        value={totalCalories.toString()}
                        content={"cal"} />
                    <Statistical 
                        label={"Distance totale parcourue"}
                        value={User.statistics.totalDistance}
                        content={"km"} />
                    <Statistical
                        label={"Nombre de jours de repos"}
                        value={restDays.toString()}
                        content={"jours"} />
                    <Statistical
                        label={"Nombre de sessions"}
                        value={User.statistics.totalSessions.toString()}
                        content={`session${Number(User.statistics.totalSessions) > 1 ? 's' : ''}`} />
                </div>
            </div>
        </div>
    );
}