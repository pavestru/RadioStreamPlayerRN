import TrackPlayer from "react-native-track-player";

import { App as AppSkeleton } from "./src/App";
import { PlaybackService } from "./src/services";

TrackPlayer.registerPlaybackService(() => PlaybackService);

export default function App() {
  return <AppSkeleton />;
}
