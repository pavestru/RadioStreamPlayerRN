import TrackPlayer, { State } from "react-native-track-player";

import { radioUrl, radioName, radioIcon } from "./radio.config.json";

/**
 * React Native Track Player does not have "stop" functionality so I have to abuse "reset" for that
 */
export const stopRadio = () => {
  TrackPlayer.pause();
};

export const stopRadioAndRemoveNotification = () => {
  TrackPlayer.reset();
};

export const playRadio = async () => {
  TrackPlayer.reset(); // stops playing and clears playlist
  await TrackPlayer.add([
    {
      url: radioUrl,
      title: radioName,
      artist: " ",
      artwork: radioIcon,
    },
  ]);
  TrackPlayer.play();
};
