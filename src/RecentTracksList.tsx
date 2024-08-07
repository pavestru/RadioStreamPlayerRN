import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { StateContext } from "./StateContext";
import { Trans } from "react-i18next";

const _styles = StyleSheet.create({
  main: {
    padding: 30,
    marginTop: 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  artistAndTitle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  titleText: {
    color: "white",
    fontSize: 20,
  },
  artistText: {
    color: "lightgray",
    fontSize: 18,
  },
  time: {
    flexBasis: 125,
    flexGrow: 0,
  },
  timeText: {
    height: 25,
    lineHeight: 25,
    textAlignVertical: "center",
    color: "lightgray",
    fontSize: 15,
    textAlign: "right",
  },
});

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

export const RecentTracksList = () => {
  const state = useContext(StateContext);
  const tracks = state.recentTracks;

  return (
    <View style={_styles.main}>
      <Text style={_styles.heading}>
        <Trans i18nKey="menu.recent">Recent tracks</Trans>
      </Text>
      <ScrollView>
        {tracks.length === 0 ? (
          <Text style={_styles.titleText}>
            <Trans i18nKey="recentTracks.loading">
              Loading recent tracks...
            </Trans>
          </Text>
        ) : (
          tracks.map(({ artist, title, time }) => (
            <View key={time} style={_styles.listItem}>
              <View style={_styles.artistAndTitle}>
                <Text style={_styles.titleText}>{title}</Text>
                <Text style={_styles.artistText}>{artist}</Text>
              </View>
              <View style={_styles.time}>
                <Text style={_styles.timeText}>
                  <Trans i18nKey="recentTracks.from">from</Trans>{" "}
                  {formatTime(time)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};
