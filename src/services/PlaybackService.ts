import TrackPlayer, { Event, State } from "react-native-track-player";

import { playRadio, stopRadio } from "../playerFunctions";

let wasPausedByDuck = false;

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("Event.RemotePause");
    stopRadio();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("Event.RemotePlay");
    playRadio();
  });

  TrackPlayer.addEventListener(
    Event.RemoteDuck,
    async ({ permanent, paused }) => {
      console.log("Event.RemoteDuck");
      if (permanent) {
        stopRadio();
        return;
      }
      if (paused) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        stopRadio();
      } else {
        if (wasPausedByDuck) {
          playRadio();
          wasPausedByDuck = false;
        }
      }
    }
  );
}
