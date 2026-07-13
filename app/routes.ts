import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/Home/index.tsx"),
    route("logout", "routes/Logout/index.tsx"),

    layout("routes/Dashboard/layout.tsx", [
        route("dashboard/:userId", "routes/Dashboard/dashboard.tsx"),
        route("profile/:userId", "routes/Dashboard/profile.tsx"),
    ]),

    route("*", "routes/NotFound/index.tsx"),
] satisfies RouteConfig;
