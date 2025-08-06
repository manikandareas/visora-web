import React from "react";
import { Await } from "react-router";
import { App } from "~/components/app";
import { getAppConfig } from "~/lib/utils";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader() {
	const headers = new Headers();
	const appConfig = getAppConfig(headers);
	return { appConfig };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const appConfig = loaderData?.appConfig;

	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Await resolve={appConfig}>{(value) => <App appConfig={value} />}</Await>
		</React.Suspense>
	);
}
