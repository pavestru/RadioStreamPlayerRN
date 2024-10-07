import { useCallback } from "react";
import { usePlaybackState, State } from "react-native-track-player";

import { playRadio, stopRadioAndRemoveNotification } from "../helpers/playerFunctions";

export const useOnTogglePlayback = (isPlayerReady: boolean, title: string, artist: string) => {
  const { state } = usePlaybackState();
  const isPlaying = state === State.Playing;

  return useCallback(async () => {
    if (!isPlayerReady) {
      return;
    }

    if (isPlaying) {
      await stopRadioAndRemoveNotification();
    } else {
      await playRadio(title, artist);
    }
  }, [isPlaying, isPlayerReady]);
};
