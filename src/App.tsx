import React from "react";
import RX from "reactxp";

import { Player } from "./Player";

const _styles = {
  main: RX.Styles.createViewStyle({
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }),

  content: RX.Styles.createViewStyle({
    flexShrink: 1,
    flexGrow: 1,
    paddingVertical: 10
  }),

  player: RX.Styles.createViewStyle({
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 100,
    backgroundColor: "lightgray",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  }),

  title: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 36,
    textAlign: "center"
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
      <RX.View style={_styles.main}>
        <RX.View style={_styles.content}>
          <RX.Text style={_styles.title}>
            Radio <RX.Text style={_styles.name}>Streamer</RX.Text>
          </RX.Text>
        </RX.View>
        <RX.View style={_styles.player}>
          <Player />
        </RX.View>
      </RX.View>
    );
  }
}
