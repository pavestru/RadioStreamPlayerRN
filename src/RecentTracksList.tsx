import React from "react";
import RX from "reactxp";

const _styles = {
  main: RX.Styles.createViewStyle({
    padding: 15
  }),
  listItem: RX.Styles.createViewStyle({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  }),
  artistAndTitle: RX.Styles.createViewStyle({}),
  titleText: RX.Styles.createTextStyle({
    fontSize: 20
  }),
  artistText: RX.Styles.createTextStyle({
    color: "gray",
    fontWeight: "bold",
    fontSize: 18
  }),
  timeText: RX.Styles.createTextStyle({
    height: 25,
    lineHeight: 25,
    textAlignVertical: "center",
    color: "gray",
    fontSize: 15
  })
};

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

interface Track {
  title: string;
  artist: string;
  time: number;
}

interface Props {
  tracks: Track[];
}

export const RecentTracksList = ({ tracks }: Props) => (
  <RX.View style={_styles.main}>
    <RX.Text>Posledné hrané:</RX.Text>
    {tracks.map(({ artist, title, time }) => (
      <RX.View key={time} style={_styles.listItem}>
        <RX.View style={_styles.artistAndTitle}>
          <RX.Text style={_styles.titleText}>{title}</RX.Text>
          <RX.Text style={_styles.artistText}>{artist}</RX.Text>
        </RX.View>
        <RX.View>
          <RX.Text style={_styles.timeText}>od {formatTime(time)}</RX.Text>
        </RX.View>
      </RX.View>
    ))}
  </RX.View>
);
