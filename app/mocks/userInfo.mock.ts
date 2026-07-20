import { mockUserActivity } from "./userActivity.mock";

const totalDistance = mockUserActivity
  .reduce((sum, s) => sum + s.distance, 0)
  .toFixed(1);
const totalSessions = mockUserActivity.length;
const totalDuration = mockUserActivity.reduce((sum, s) => sum + s.duration, 0);

export const mockUserInfo = {
  profile: {
    firstName: "Jean",
    lastName: "Dupont",
    createdAt: "2026-06-01",
    age: 28,
    weight: 70,
    height: 175,
    profilePicture: "https://i.pravatar.cc/150?u=jean-dupont",
  },
  statistics: { totalDistance, totalSessions, totalDuration },
};