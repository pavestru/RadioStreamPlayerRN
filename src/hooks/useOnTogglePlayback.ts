import { useCallback } from "react";
import { usePlaybackState, State } from "react-native-track-player";

import { playRadio, stopRadioAndRemoveNotification } from "../playerFunctions";

export const useOnTogglePlayback = (isPlayerReady: boolean) => {
  const { state } = usePlaybackState();
  const isPlaying = state === State.Playing;

  return useCallback(async () => {
    if (!isPlayerReady) {
      return;
    }

    if (isPlaying) {
      stopRadioAndRemoveNotification();
    } else {
      playRadio();
    }
  }, [isPlaying, isPlayerReady]);
};
