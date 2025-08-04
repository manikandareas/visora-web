import {
	AccessToken,
	type AccessTokenOptions,
	type VideoGrant,
} from "livekit-server-sdk";
import type { Route } from "./+types/connection-details";

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export type ConnectionDetails = {
	serverUrl: string;
	roomName: string;
	participantName: string;
	participantToken: string;
};

export async function loader() {
	try {
		if (LIVEKIT_URL === undefined) {
			throw new Error("LIVEKIT_URL is not defined");
		}
		if (API_KEY === undefined) {
			throw new Error("LIVEKIT_API_KEY is not defined");
		}
		if (API_SECRET === undefined) {
			throw new Error("LIVEKIT_API_SECRET is not defined");
		}

		// Generate participant token
		const participantName = "user";
		const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10_000)}`;
		const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;
		const participantToken = await createParticipantToken(
			{ identity: participantIdentity, name: participantName },
			roomName,
		);

		// Return connection details
		const data: ConnectionDetails = {
			serverUrl: LIVEKIT_URL,
			roomName,
			participantToken: participantToken,
			participantName,
		};
		const headers = new Headers({
			"Cache-Control": "no-store",
		});
		return Response.json(data, { headers });
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return new Response(error.message, { status: 500 });
		}
	}
}

function createParticipantToken(
	userInfo: AccessTokenOptions,
	roomName: string,
) {
	const at = new AccessToken(API_KEY, API_SECRET, {
		...userInfo,
		ttl: "15m",
	});
	const grant: VideoGrant = {
		room: roomName,
		roomJoin: true,
		canPublish: true,
		canPublishData: true,
		canSubscribe: true,
	};
	at.addGrant(grant);
	return at.toJwt();
}
