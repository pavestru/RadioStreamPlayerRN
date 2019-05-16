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
  titleText: RX.Styles.createTextStyle({
    fontSize: 20
  }),
  artistText: RX.Styles.createTextStyle({
    color: "gray",
    fontSize: 18
  })
};

const articles = [
  {
    title: "Duis aute irure dolor",
    text: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore \
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \
sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {
    title: "Lorem ipsum",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  },
  {
    title: "Cras hendrerit ligula facilisis ex venenatis",
    text: `Cras hendrerit ligula facilisis ex venenatis, vitae fringilla mi finibus. \
Donec a odio felis. Nullam pretium, massa eu porttitor varius, mauris leo hendrerit turpis, \
eget aliquam lacus risus eget lorem. Nulla facilisi.`
  }
];

const formatTime = (time: number) => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

interface RecentTracksListProps {
  navigation: any;
}

export const Articles = (props: RecentTracksListProps) => (
  <StateContext.Consumer>
    {state => {
      return (
        <RX.View style={_styles.main}>
          {articles.map(({ title, text }) => (
            <RX.View key={title} style={_styles.listItem}>
              <RX.View style={_styles.artistAndTitle}>
                <RX.Text style={_styles.titleText}>{title}</RX.Text>
                <RX.Text style={_styles.artistText}>{text}</RX.Text>
              </RX.View>
            </RX.View>
          ))}
        </RX.View>
      );
    }}
  </StateContext.Consumer>
);
