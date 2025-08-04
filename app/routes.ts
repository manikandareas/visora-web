import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("api/connection-details", "routes/api/connection-details.ts"),
] satisfies RouteConfig;
