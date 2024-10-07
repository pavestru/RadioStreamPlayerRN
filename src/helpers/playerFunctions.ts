import TrackPlayer, { State } from "react-native-track-player";

import { radioUrl, radioName, radioIcon } from "../radio.config.json";

/**
 * React Native Track Player does not have "stop" functionality so I have to abuse "reset" for that
 */
export const stopRadio = () => {
  TrackPlayer.pause();
};

export const stopRadioAndRemoveNotification = async () => {
  await TrackPlayer.reset();
};

export const playRadio = async (title?: string, artist?: string) => {
  await TrackPlayer.reset(); // stops playing and clears playlist
  await TrackPlayer.add([
    {
      url: radioUrl,
      title: title ?? radioName,
      artist: artist ?? " ",
      artwork: radioIcon,
    },
  ]);
  await TrackPlayer.play();
};

export const updateMetadata = async (title: string | null, artist: string | null) => {
  await TrackPlayer.updateMetadataForTrack(0, {
    title: title ?? radioName,
    artist: artist ?? " ",
    artwork: radioIcon,
  });
}
