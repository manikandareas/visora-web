import { use } from "react";
import { App } from "~/components/app";
import type { AppConfig } from "~/lib/types";
import { getAppConfig } from "~/lib/utils";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	const headers = new Headers();
	const appConfig = use(getAppConfig(headers));

	return <App appConfig={appConfig as AppConfig} />;
}
