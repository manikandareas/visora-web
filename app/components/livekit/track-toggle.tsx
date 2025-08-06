import type { useTrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import { Loader, Mic, MicOff, MonitorUp, Video, VideoOff } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";
import { Toggle } from "../ui/toggle";

export type TrackToggleProps = React.ComponentProps<typeof Toggle> & {
	source: Parameters<typeof useTrackToggle>[0]["source"];
	pending?: boolean;
};

function getSourceIcon(
	source: Track.Source,
	enabled: boolean,
	pending = false,
) {
	if (pending) {
		return Loader;
	}

	switch (source) {
		case Track.Source.Microphone:
			return enabled ? Mic : MicOff;
		case Track.Source.Camera:
			return enabled ? Video : VideoOff;
		case Track.Source.ScreenShare:
			return MonitorUp;
		default:
			return React.Fragment;
	}
}

export function TrackToggle({
	source,
	pressed,
	pending,
	className,
	...props
}: TrackToggleProps) {
	const IconComponent = getSourceIcon(source, pressed ?? false, pending);

	return (
		<Toggle
			pressed={pressed}
			aria-label={`Toggle ${source}`}
			className={cn(className)}
			{...props}
		>
			<IconComponent className={cn(pending && "animate-spin")} />
			{props.children}
		</Toggle>
	);
}
