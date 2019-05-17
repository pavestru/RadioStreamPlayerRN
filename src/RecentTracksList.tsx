import React from "react";
import RX from "reactxp";

import { StateContext } from "./StateContext";

const _styles = {
  main: RX.Styles.createViewStyle({
    padding: 20,
    marginTop: 10
  }),
  listItem: RX.Styles.createViewStyle({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  }),
  artistAndTitle: RX.Styles.createViewStyle({
    flexGrow: 1,
    flexShrink: 1
  }),
  titleText: RX.Styles.createTextStyle({
    fontSize: 20
  }),
  artistText: RX.Styles.createTextStyle({
    color: "gray",
    fontWeight: "bold",
    fontSize: 18
  }),
  time: RX.Styles.createViewStyle({
    flexBasis: 120,
    flexGrow: 0
  }),
  timeText: RX.Styles.createTextStyle({
    height: 25,
    lineHeight: 25,
    textAlignVertical: "center",
    color: "gray",
    fontSize: 15,
    textAlign: "right"
  })
};

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

export const RecentTracksList = () => (
  <StateContext.Consumer>
    {state => {
      const tracks = state!.recentTracks;
      return (
        <RX.View style={_styles.main}>
          {tracks.map(({ artist, title, time }) => (
            <RX.View key={time} style={_styles.listItem}>
              <RX.View style={_styles.artistAndTitle}>
                <RX.Text style={_styles.titleText}>{title}</RX.Text>
                <RX.Text style={_styles.artistText}>{artist}</RX.Text>
              </RX.View>
              <RX.View style={_styles.time}>
                <RX.Text style={_styles.timeText}>
                  od {formatTime(time)}
                </RX.Text>
              </RX.View>
            </RX.View>
          ))}
        </RX.View>
      );
    }}
  </StateContext.Consumer>
);
