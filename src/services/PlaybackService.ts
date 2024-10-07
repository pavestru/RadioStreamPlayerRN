import TrackPlayer, { Event, State } from "react-native-track-player";

import {
  playRadio,
  stopRadio,
  stopRadioAndRemoveNotification,
  updateMetadata,
} from "../helpers/playerFunctions";

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

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log("Event.RemoteStop");
    stopRadioAndRemoveNotification();
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
        const { state: playerState } = await TrackPlayer.getPlaybackState();
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

  TrackPlayer.addEventListener(Event.MetadataTimedReceived, async (data) => {
    const urlParams = new URLSearchParams(data.metadata[0].raw[0].value + "");
    const artist = urlParams.get("artist");
    const title = urlParams.get("title");

    await updateMetadata(title, artist);
  });
}
