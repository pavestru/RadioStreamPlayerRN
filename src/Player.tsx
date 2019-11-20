import React, { useContext, useState, useEffect } from "react";
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
    paddingRight: 15
  }),
  button: RX.Styles.createViewStyle({
    width: 70,
    height: 70,
    margin: 15,
    padding: 3,
    backgroundColor: "#adbabf",
    borderRadius: 25
  }),
  info: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1
  }),
  title: RX.Styles.createTextStyle({
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 24
  }),
  artist: RX.Styles.createTextStyle({
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65"
  })
};

export const Player = () => {
  const [playbackState, setPlaybackState] = useState({ paused: true });
  const state = useContext(StateContext);

  const artist =
    state.recentTracks.length > 0 ? state.recentTracks[0].artist : "";
  const title =
    state.recentTracks.length > 0 ? state.recentTracks[0].title : "";

  const handleOnTap = () => {
    setPlaybackState(({ paused }) => ({ paused: !paused }));
  };

  const handlePlay = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING
    });
    setPlaybackState(() => ({ paused: false }));
  };

  const handlePause = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED
    });
    setPlaybackState(() => ({ paused: true }));
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
        : MusicControl.STATE_PLAYING
    });
  }, [playbackState]);

  // Update MusicControl "now playing" state with the state
  useEffect(() => {
    MusicControl.setNowPlaying({
      title,
      artist
    });
  }, [state]);

  return (
    <RX.View style={_styles.player}>
      <RX.GestureView style={_styles.button} onTap={handleOnTap}>
        {playbackState.paused ? <Play /> : <Stop />}
        {!playbackState.paused && (
          <Video
            source={{
              uri: radioUrl
            }}
            paused={playbackState.paused}
            ignoreSilentSwitch="ignore"
            playInBackground
          />
        )}
      </RX.GestureView>
      <RX.View style={_styles.info}>
        <RX.Text numberOfLines={1} style={_styles.title}>
          {title}
        </RX.Text>
        <RX.Text numberOfLines={1} style={_styles.artist}>
          {artist}
        </RX.Text>
      </RX.View>
    </RX.View>
  );
};
