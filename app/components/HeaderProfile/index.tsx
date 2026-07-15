import { formatDateFr } from "~/services/dateUtils";
import { useUser } from "../../context/UserContext";
import './headerProfile.css';

export default function HeaderProfile({ children }: { children?: React.ReactNode }) {
    const { profile } = useUser();

    return (
        <div className="header-profile">
            <img src={`${profile.profilePicture}`} alt="Profile Picture" className="profile-picture"/>
            <div className="user-details">
                <p className="user-name">{profile.firstName + ' ' + profile.lastName}</p>
                <p className="member-date">Membre depuis le {formatDateFr(profile.createdAt)}</p>
            </div>
            {children}
        </div>
    );
}