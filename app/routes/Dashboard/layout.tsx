import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Layout.css";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <div className="layout-container">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}