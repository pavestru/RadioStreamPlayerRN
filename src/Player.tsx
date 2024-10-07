import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TrackPlayer, {
  State,
  RepeatMode,
  usePlaybackState,
} from "react-native-track-player";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Trans } from "react-i18next";

import { StateContext } from "./state/StateContext";

import { SetupService } from "./services";
import { useOnTogglePlayback } from "./hooks/useOnTogglePlayback";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

export const Play = () => <Icon name="play" size={64} color="#0a4d65" />;
export const Stop = () => <Icon name="stop" size={64} color="#0a4d65" />;

export function Player() {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();
      setIsPlayerReady(isSetup);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }

    run();
  }, []);

  const { state: playbackState }  = usePlaybackState();
  const isPlaying = playbackState === State.Playing;
  const isLoading = useDebouncedValue(
    playbackState === State.Loading || playbackState === State.Buffering,
    250
  );

  const state = useContext(StateContext);
  
  const artist =
  state.recentTracks.length > 0 ? state.recentTracks[0].artist : "";
  const title =
  state.recentTracks.length > 0 ? state.recentTracks[0].title : "";
  
  const onTogglePlayback = useOnTogglePlayback(isPlayerReady, artist, title);

  const infoComponent =
    isLoading || !isPlayerReady ? (
      <View style={_styles.info}>
        <Text numberOfLines={1} style={_styles.mainInfo}>
          <Trans i18nKey="player.loading">Loading...</Trans>
        </Text>
        <Text numberOfLines={2} style={_styles.subInfo}>
          <Trans i18nKey="player.loadingNotice">If it takes long, check your internet connection.</Trans>
        </Text>
      </View>
    ) : (
      <View style={_styles.info}>
        <Text numberOfLines={1} style={_styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={_styles.artist}>
          {artist}
        </Text>
      </View>
    );

  return (
    <View style={_styles.player}>
      <TouchableOpacity style={_styles.button} onPress={onTogglePlayback}>
        {isPlaying ? <Stop /> : <Play />}
      </TouchableOpacity>
      {infoComponent}
    </View>
  );
}

const _styles = StyleSheet.create({
  player: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: "#ccd3de",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row",
    paddingRight: 15,
  },
  button: {
    width: 70,
    height: 70,
    margin: 15,
    padding: 3,
    backgroundColor: "#adbabf",
    borderRadius: 25,
  },
  info: {
    flexShrink: 1,
    flexGrow: 1,
  },
  title: {
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 24,
  },
  artist: {
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65",
  },
  mainInfo: {
    color: "#0a4d65",
    fontWeight: "bold",
    lineHeight: 24,
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 12,
  },
  subInfo: {
    lineHeight: 24,
    fontSize: 18,
    color: "#0a4d65",
  },
});
