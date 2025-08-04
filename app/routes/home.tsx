import { App } from "~/components/app";
import { getAppConfig } from "~/lib/utils";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader(args: Route.LoaderArgs) {
	const hdrs = args.request.headers;

	const appConfig = await getAppConfig(hdrs);

	return { appConfig };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const appConfig = loaderData.appConfig;

	return <App appConfig={appConfig} />;
}
