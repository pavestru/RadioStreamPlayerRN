import React, { useContext } from "react";
import RX from "reactxp";

import { StateContext } from "./StateContext";

const _styles = {
  main: RX.Styles.createViewStyle({
    padding: 30,
    marginTop: 0,
  }),
  heading: RX.Styles.createTextStyle({
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
  }),
  listItem: RX.Styles.createViewStyle({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  }),
  artistAndTitle: RX.Styles.createViewStyle({
    flexGrow: 1,
    flexShrink: 1,
  }),
  titleText: RX.Styles.createTextStyle({
    color: "white",
    fontSize: 20,
  }),
  artistText: RX.Styles.createTextStyle({
    color: "lightgray",
    fontSize: 18,
  }),
  time: RX.Styles.createViewStyle({
    flexBasis: 120,
    flexGrow: 0,
  }),
  timeText: RX.Styles.createTextStyle({
    height: 25,
    lineHeight: 25,
    textAlignVertical: "center",
    color: "lightgray",
    fontSize: 15,
    textAlign: "right",
  }),
};

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

export const RecentTracksList = () => {
  const state = useContext(StateContext);
  const tracks = state.recentTracks;

  return (
    <RX.View style={_styles.main}>
      <RX.Text style={_styles.heading}>Posledné hrané</RX.Text>
      <RX.ScrollView>
        {tracks.length === 0 ? (
          <RX.Text style={_styles.titleText}>
            Načítavam zoznam posledných hraných skladieb...
          </RX.Text>
        ) : (
          tracks.map(({ artist, title, time }) => (
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
          ))
        )}
      </RX.ScrollView>
    </RX.View>
  );
};
