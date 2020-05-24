import React, { useContext, useReducer, useEffect } from "react";
import RX from "reactxp";

import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MusicControl from "react-native-music-control";
import { Command } from "react-native-music-control/lib/types";

import { StateContext } from "./StateContext";

import { radioUrl } from "./radio.config.json";

export const Play = () => <Icon name="play" size={64} color="#0a4d65" />;
export const Stop = () => <Icon name="stop" size={64} color="#0a4d65" />;

const _styles = {
  player: RX.Styles.createViewStyle({
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: "#ccd3de",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row",
    paddingRight: 15,
  }),
  button: RX.Styles.createViewStyle({
    width: 70,
    height: 70,
    margin: 15,
    padding: 3,
    backgroundColor: "#adbabf",
    borderRadius: 25,
  }),
  info: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1,
  }),
  title: RX.Styles.createTextStyle({
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 24,
  }),
  artist: RX.Styles.createTextStyle({
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65",
  }),
  mainInfo: RX.Styles.createTextStyle({
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 12,
  }),
  subInfo: RX.Styles.createTextStyle({
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65",
  }),
};

interface PlaybackState {
  paused: boolean;
  buffering: boolean;
  error: boolean;
}

type PlaybackAction =
  | { type: "tap" }
  | { type: "play" }
  | { type: "pause" }
  | { type: "buffering" }
  | { type: "loaded" }
  | { type: "error"; error: string };

const playbackStateReducer = (
  state: PlaybackState,
  action: PlaybackAction
): PlaybackState => {
  console.log(action.type);
  let returnState;
  switch (action.type) {
    case "tap":
      returnState = { ...state, paused: !state.paused };
      break;
    case "play":
      returnState = { ...state, paused: false };
      break;
    case "pause":
      returnState = { ...state, paused: true, buffering: false };
      break;
    case "buffering":
      returnState = { ...state, buffering: true };
      break;
    case "loaded":
      returnState = { ...state, buffering: false };
      break;
    case "error":
      returnState = { ...state, buffering: false, paused: true, error: true };
      break;
    default:
      returnState = state;
  }
  console.log(returnState);
  return returnState;
};

export const Player = () => {
  const [playbackState, dispatch] = useReducer(playbackStateReducer, {
    paused: true,
    buffering: false,
    error: false,
  });
  const state = useContext(StateContext);

  const artist =
    state.recentTracks.length > 0 ? state.recentTracks[0].artist : "";
  const title =
    state.recentTracks.length > 0 ? state.recentTracks[0].title : "";

  const handlePlay = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
    dispatch({ type: "play" });
  };

  const handlePause = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
    dispatch({ type: "pause" });
  };

  const handleOnTap = () => {
    if (playbackState.paused) {
      handlePlay();
    } else {
      handlePause();
    }
  };

  const handleOnLoadStart = () => {
    dispatch({ type: "buffering" });
  };

  const handleOnLoad = () => {
    dispatch({ type: "loaded" });
  };

  // Init MusicControl (run once)
  useEffect(() => {
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);
    MusicControl.enableControl("play", true);
    MusicControl.enableControl("pause", true);
    MusicControl.enableControl("nextTrack", false);
    MusicControl.enableControl("previousTrack", false);
    MusicControl.enableControl("changePlaybackPosition", false);
    MusicControl.enableControl("seekForward", false); // iOS only
    MusicControl.enableControl("seekBackward", false); // iOS only
    // MusicControl.enableControl("seek", false); // Android only
    MusicControl.enableControl("skipForward", false);
    MusicControl.enableControl("skipBackward", false);

    MusicControl.setNowPlaying({});

    MusicControl.on(Command.play, handlePlay);
    MusicControl.on(Command.pause, handlePause);
  }, []);

  // Update MusicControl playback state (paused) with player state
  useEffect(() => {
    MusicControl.updatePlayback({
      state: playbackState.paused
        ? MusicControl.STATE_PAUSED
        : MusicControl.STATE_PLAYING,
    });
  }, [playbackState.paused]);

  // Update MusicControl "now playing" state with the state
  useEffect(() => {
    MusicControl.setNowPlaying({
      title,
      artist,
    });
  }, [state]);

  const infoComponent = playbackState.buffering ? (
    <RX.View style={_styles.info}>
      <RX.Text numberOfLines={1} style={_styles.mainInfo}>
        Načítavam...
      </RX.Text>
      <RX.Text numberOfLines={2} style={_styles.subInfo}>
        Ak prebieha načítavanie dlhšie, skontrolujte pripojenie na internet.
      </RX.Text>
    </RX.View>
  ) : (
    <RX.View style={_styles.info}>
      <RX.Text numberOfLines={1} style={_styles.title}>
        {title}
      </RX.Text>
      <RX.Text numberOfLines={1} style={_styles.artist}>
        {artist}
      </RX.Text>
    </RX.View>
  );

  return (
    <RX.View style={_styles.player}>
      <RX.GestureView style={_styles.button} onTap={handleOnTap}>
        {playbackState.paused ? <Play /> : <Stop />}
        {!playbackState.paused && (
          <Video
            source={{
              uri: radioUrl,
            }}
            paused={playbackState.paused}
            ignoreSilentSwitch="ignore"
            playInBackground
            onLoadStart={handleOnLoadStart}
            onLoad={handleOnLoad}
          />
        )}
      </RX.GestureView>
      {infoComponent}
    </RX.View>
  );
};
