import type { Route } from "./+types/layout";
import { getTokenFromCookie } from "~/services/auth";
import { getUserActivity, getUserInfo } from "~/services/api";
import { getDateOfDay } from "~/services/dateUtils";
import { UserProvider } from "~/context/UserContext";
import { ActivityProvider } from "~/context/ActivityContext";
import { Outlet, redirect } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Layout.css";

export async function loader({ request }: Route.LoaderArgs) {
    const cookie = request.headers.get("Cookie");
    const token = getTokenFromCookie(cookie);

    if (!token) {
        throw redirect("/");
    }

    try {
        const userInfo = await getUserInfo(token);
        const activity = await getUserActivity(token, userInfo.profile.createdAt, getDateOfDay());
        return { userInfo, activity };
    } catch (error) {
        throw redirect("/");
    }
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const { userInfo, activity } = loaderData;

  return (
    <div className="layout">
      <div className="layout-container">
        <Header />
          <UserProvider value={userInfo}>
            <ActivityProvider value={activity}>
              <Outlet />
            </ActivityProvider>
          </UserProvider>
      </div>
      <Footer />
    </div>
  );
}