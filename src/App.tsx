import React from "react";
import RX from "reactxp";

import { StateContext } from "./StateContext";

import { isIphoneX } from "./helpers";

import { Player } from "./Player";
import { RecentTracksList } from "./RecentTracksList";

const _styles = {
  main: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: "white"
  }),

  content: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1
  }),

  logo: RX.Styles.createImageStyle({
    marginTop: isIphoneX ? 50 : 20,
    marginHorizontal: 10,
    height: 80
  }),

  name: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 36,
    color: "red"
  })
};

export class App extends RX.Component {
  public render() {
    return (
      <StateContext.Provider>
        <RX.View style={_styles.main}>
          <RX.View style={_styles.content}>
            <RX.Image
              resizeMode="contain"
              style={_styles.logo}
              source={require("./logo.png")}
              title="Logo"
            />
            <RecentTracksList />
          </RX.View>
          <Player />
        </RX.View>
      </StateContext.Provider>
    );
  }
}
